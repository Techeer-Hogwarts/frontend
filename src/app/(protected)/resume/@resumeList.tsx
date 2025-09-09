import { useResumeListQuery } from '@/api/resume/queries'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ResumeQueryParams } from '@/api/resume/types'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLike } from '../../blog/_lib/useLike'
import { useBookmark } from '../../blog/_lib/useBookmark'

type Resume = {
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
}

export default function ResumeList({
  position = [],
  year = [],
  category = '전체',
  sortBy = 'CREATEDAT',
}: ResumeQueryParams = {}) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])

  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useResumeListQuery({
    position,
    year,
    category,
    sortBy,
  })

  const convertToResume = (item: any): Resume => ({
    id: item.id,
    createdAt: item.createdAt,
    title: item.title,
    category: item.category,
    position: item.position,
    likeCount: item.likeCount,
    year: item.year,
    user: {
      id: item.user.id,
      name: item.user.name,
      profileImage: item.user.profileImage,
      year: item.user.year,
      mainPosition: item.user.mainPosition,
    },
  })

  // checkLike, checkBookmark 함수를 useCallback으로 메모이제이션
  const checkLike = useCallback(async () => {
    try {
      const data = await fetchLikes('RESUME', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }, [])

  const checkBookmark = useCallback(async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }, [])

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

  // 필터 변경 시 초기화 및 상태 체크
  useEffect(() => {
    checkLike()
    checkBookmark()
  }, [position, year, category, sortBy, checkLike, checkBookmark])

  // 무한 스크롤 처리
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const resumes =
    data?.pages.flatMap((page) => page.data.map(convertToResume)) ?? []

  if (isLoading && resumes.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonResumeFolder key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  if (isError || (!isLoading && resumes.length === 0)) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="이력서 데이터가 없습니다."
          text2="다시 조회해주세요"
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {resumes.map((resume) => (
        <ResumeFolder
          key={resume.id}
          resume={resume}
          likeCount={resume.likeCount}
          likeList={likeList}
          onLikeUpdate={handleLikeUpdate}
          bookmarkList={bookmarkList}
          onBookmarkUpdate={handleBookmarkUpdate}
        />
      ))}
      {isFetchingNextPage && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonResumeFolder key={`loading-skeleton-${i}`} />
          ))}
        </>
      )}
      {hasNextPage && <div ref={ref} className="h-1" />}
    </div>
  )
}
