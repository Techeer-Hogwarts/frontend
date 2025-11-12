'use client'

import React, { useCallback, useEffect, useState } from 'react'
import ResumeFolder from './ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'
import { useUserResumeListQuery } from '@/api/resume/queries'
import { useInView } from 'react-intersection-observer'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { usePathname } from 'next/navigation'

export default function Resume({ userId }: { userId: number }) {
  const [modal, setModal] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])

  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()
  const pathname = usePathname()
  const isMyPage = pathname === '/mypage'

  // 사용자 이력서 목록 조회
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useUserResumeListQuery(userId, 10)

  // 좋아요/북마크 상태 조회 함수들
  const checkLike = useCallback(async () => {
    try {
      const data = await fetchLikes('RESUME', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }, []) // 의존성 배열에서 fetchLikes 제거

  const checkBookmark = useCallback(async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }, []) // 의존성 배열에서 fetchBookmarks 제거

  const handleLikeUpdate = (resumeId: string, newLikeCount: number) => {
    setTimeout(() => {
      checkLike()
      refetch()
    }, 500)
  }

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    setTimeout(() => {
      checkBookmark()
      refetch()
    }, 500)
  }

  // 초기 데이터 로드
  useEffect(() => {
    checkLike()
    checkBookmark()
  }, [userId, checkLike, checkBookmark])

  // 무한 스크롤 처리
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleClickAddResume = () => {
    setModal(!modal)
  }

  // 모든 페이지의 데이터를 평탄화하고 타입 변환
  const resumes =
    data?.pages.flatMap((page) =>
      page.data.map((item) => ({
        id: item.id.toString(),
        createdAt: new Date(item.createdAt).getTime(),
        title: item.title,
        category: item.category,
        position: item.position,
        likeCount: item.likeCount,
        year: '',
        user: {
          id: userId,
          name: item.user.name,
          profileImage: item.user.profileImage,
          year: item.user.year,
          mainPosition: item.position,
        },
        likeList: [],
        bookmarkList: [],
      })),
    ) ?? []

  return (
    <div>
      {/* 상단 영역 */}
      <div className="flex w-[890px] justify-end mb-4">
        {isMyPage && (
          <button
            onClick={handleClickAddResume}
            className="border border-lightgray text-black flex items-center justify-center p-2 h-8 w-[130px] rounded-md hover:bg-lightprimary hover:text-primary hover:border-primary hover:font-medium"
          >
            이력서 추가
          </button>
        )}
        {modal && <AddResume setModal={setModal} fetchData={() => refetch()} />}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {isLoading && resumes.length === 0 && (
          <>
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
          </>
        )}

        {resumes.map((resume) => (
          <Link key={resume.id} href={`/resume/${resume.id}`}>
            <ResumeFolder
              likeCount={resume.likeCount}
              resume={resume}
              likeList={likeList}
              onLikeUpdate={handleLikeUpdate}
              bookmarkList={bookmarkList}
              onBookmarkUpdate={handleBookmarkUpdate}
            />
          </Link>
        ))}

        {/* 추가 로딩 스켈레톤 */}
        {isFetchingNextPage && (
          <>
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
          </>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      {hasNextPage && <div ref={ref} className="h-1" />}

      {/* 에러 상태 */}
      {isError && (
        <div className="text-center text-red-500 mt-4">
          이력서를 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      {/* 빈 상태 */}
      {!isLoading && !isError && resumes.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          등록된 이력서가 없습니다.
        </div>
      )}
    </div>
  )
}
