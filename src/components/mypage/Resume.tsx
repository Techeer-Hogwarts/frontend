'use client'

import React, { useEffect, useState } from 'react'
import ResumeFolder from './ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'
import { ResumeQueryParams } from '@/types/queryParams'
import { fetchUserResumes } from '@/app/(protected)/resume/api/getUserResume'
import { useInView } from 'react-intersection-observer'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { usePathname } from 'next/navigation'

interface Resume {
  id: string
  createdAt: number
  title: string
  category: string
  position: string
  likeCount: number
  year: string
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
  likeList: string[]
  bookmarkList: string[]
}

export default function Resume({ userId }) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [modal, setModal] = useState(false)
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(
    undefined,
  )
  const [hasNext, setHasNext] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [likeList, setLikeList] = useState<string[]>([])
  const { fetchLikes } = useLike()
  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const { fetchBookmarks } = useBookmark()

  const pathname = usePathname()
  const isMyPage = pathname === '/mypage'

  // API 호출 - 초기 데이터 로드
  const fetchData = async (reset: boolean = false) => {
    try {
      if (reset) {
        setIsLoading(true)
        setResumes([])
        setCurrentCursor(undefined)
        setHasNext(true)
      } else {
        setIsLoadingMore(true)
      }
      setIsError(false)

      const result = await fetchUserResumes(
        userId,
        reset ? undefined : currentCursor,
        10,
      )

      // 새로운 API 응답 구조에 맞춰 데이터 변환
      const convertedResumes: Resume[] = result.data.map((item) => ({
        id: item.id.toString(),
        createdAt: new Date(item.createdAt).getTime(),
        title: item.title,
        category: item.category,
        position: item.position,
        likeCount: item.likeCount,
        year: '', // API 응답에 year가 없으므로 빈 문자열로 설정
        user: {
          id: userId, // userId 사용
          name: item.user.name,
          profileImage: item.user.profileImage,
          year: item.user.year,
          mainPosition: item.position, // position을 mainPosition으로 사용
        },
        likeList: [],
        bookmarkList: [],
      }))

      if (reset) {
        setResumes(convertedResumes)
      } else {
        setResumes((prev) => {
          const existingIds = new Set(prev.map((p) => p.id))
          const newResumes = convertedResumes.filter(
            (p) => !existingIds.has(p.id),
          )
          return [...prev, ...newResumes]
        })
      }

      setCurrentCursor(result.nextCursor)
      setHasNext(result.hasNext)
    } catch (error) {
      setIsError(true)
      console.error('이력서 데이터 로드 실패:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const checkLike = async () => {
    try {
      const data = await fetchLikes('RESUME', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const checkBookmark = async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const handleLikeUpdate = (resumeId: string, newLikeCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, likeCount: newLikeCount }
          : resume,
      ),
    )
  }

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, bookmarkCount: newBookmarkCount }
          : resume,
      ),
    )
  }

  // 초기 데이터 로드
  useEffect(() => {
    fetchData(true)
    checkLike()
    checkBookmark()
  }, [userId])

  // 무한 스크롤 - 추가 데이터 로드
  useEffect(() => {
    if (inView && hasNext && !isLoadingMore && !isLoading) {
      fetchData(false)
    }
  }, [inView, hasNext, isLoadingMore, isLoading])

  const handleClickAddResume = () => {
    setModal(!modal)
  }

  // 렌더
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
        {modal && (
          <AddResume setModal={setModal} fetchData={() => fetchData(true)} />
        )}
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
        {isLoadingMore && (
          <>
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
            <SkeletonResumeFolder />
          </>
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      {hasNext && <div ref={ref} className="h-1" />}

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
