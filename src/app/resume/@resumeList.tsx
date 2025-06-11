import { useGetResumeQuery } from './query/useGetResumeQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ResumeQueryParams } from '@/types/queryParams'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLike } from '../blog/_lib/useLike'
import { useBookmark } from '../blog/_lib/useBookmark'
import { getResumeList } from './api/getResumeList'

// Resume 타입 가져오기
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
  likeList: string[]
  bookmarkList: string[]
  onLikeUpdate?: (id: string, newLikeCount: number) => void
  onBookmarkUpdate?: (id: string, newBookmarkCount: number) => void
}

interface ResumeItem {
  id: string
  createdAt: number
  title: string
  category: string
  position: string
  likeCount: number
  viewCount: number
  url: string
  isMain: boolean
  updatedAt: string
  year?: string // 기존 호환성을 위해 optional로 유지
  user: {
    id?: number // 기존 호환성을 위해 optional로 유지
    name: string
    nickname: string
    profileImage: string
    year?: number // 기존 호환성을 위해 optional로 유지
    mainPosition?: string // 기존 호환성을 위해 optional로 유지
  }
  likeList?: string[]
  bookmarkList?: string[]
}

export default function ResumeList({
  position = [],
  year = [],
  category = '전체',
}: ResumeQueryParams = {}) {
  const [resumes, setResumes] = useState<ResumeItem[]>([])
  const [currentCursor, setCurrentCursor] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [ref, inView] = useInView({ threshold: 0.1 })

  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])

  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  const {
    data: resumeResponse,
    isLoading,
    isError,
    refetch,
  } = useGetResumeQuery({
    position,
    year,
    category: category || '전체',
    cursorId: undefined,
    limit: 10,
  })

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

    // 탭 변경 시에도 좋아요 상태 유지를 위해 서버 데이터 갱신
    setTimeout(() => {
      checkLike()
      refetch()
    }, 500)
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

    // 탭 변경 시에도 좋아요 상태 유지를 위해 서버 데이터 갱신
    setTimeout(() => {
      checkBookmark()
      refetch()
    }, 500)
  }

  // ResumeItem을 기존 Resume 타입으로 변환
  const convertToResume = (item: ResumeItem): Resume => ({
    id: item.id,
    createdAt: item.createdAt,
    title: item.title,
    category: item.category,
    position: item.position,
    likeCount: item.likeCount,
    year: item.year || '', // 새 API에서는 user.year를 사용하거나 기본값
    user: {
      id: item.user.id || 0,
      name: item.user.name,
      profileImage: item.user.profileImage,
      year: item.user.year || 0,
      mainPosition: item.user.mainPosition || item.position,
    },
    likeList: item.likeList || [],
    bookmarkList: item.bookmarkList || [],
  })

  // 더 많은 데이터 로드하기
  const loadMoreResumes = async () => {
    if (!hasNext || isLoadingMore) return

    try {
      setIsLoadingMore(true)
      const response = await getResumeList({
        position,
        year,
        category: category || '전체',
        cursorId: currentCursor,
        limit: 10,
      })

      if (response.data && response.data.length > 0) {
        setResumes((prev) => {
          const existingIds = new Set(prev.map((p) => p.id))
          const newResumes = response.data.filter(
            (p: ResumeItem) => !existingIds.has(p.id),
          )
          return [...prev, ...newResumes]
        })
        setCurrentCursor(response.nextCursor)
        setHasNext(response.hasNext)
      }
    } catch (error) {
      console.error('더 많은 이력서 로드 실패:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // 필터 변경 시 초기화
  useEffect(() => {
    setResumes([])
    setCurrentCursor(0)
    setHasNext(true)
    checkLike()
    checkBookmark()
    refetch()
  }, [position, year, category])

  // 초기 데이터 로드
  useEffect(() => {
    if (resumeResponse?.data) {
      setResumes(resumeResponse.data)
      setCurrentCursor(resumeResponse.nextCursor)
      setHasNext(resumeResponse.hasNext)
    }
  }, [resumeResponse])

  // 무한 스크롤 트리거
  useEffect(() => {
    if (inView && hasNext && !isLoadingMore) {
      loadMoreResumes()
    }
  }, [inView, hasNext, isLoadingMore])

  if (isLoading && resumes.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonResumeFolder key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  if (isError || (resumeResponse && resumes.length === 0)) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="이력서 데이터가 없습니다."
          text2="다시 조회해주세요"
        />
      </div>
    ) // 오류 발생 시 표시할 문구
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {resumes.map((resume) => (
        <ResumeFolder
          key={resume.id}
          likeCount={resume.likeCount}
          resume={convertToResume(resume)}
          likeList={likeList}
          onLikeUpdate={handleLikeUpdate}
          bookmarkList={bookmarkList}
          onBookmarkUpdate={handleBookmarkUpdate}
        />
      ))}
      {isLoadingMore && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonResumeFolder key={`loading-skeleton-${i}`} />
          ))}
        </>
      )}
      {hasNext && <div ref={ref} className="h-1" />}
    </div>
  )
}
