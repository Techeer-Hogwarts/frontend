import { useGetResumeQuery } from './query/useGetResumeQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ResumeQueryParams } from '@/types/queryParams'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLike } from '../blog/_lib/useLike'
import { useBookmark } from '../blog/_lib/useBookmark'

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

export default function ResumeList({
  position = [],
  year = [],
  category = '전체',
}: ResumeQueryParams = {}) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [limit, setLimit] = useState(8)

  const [ref, inView] = useInView({ threshold: 0.1 })

  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])

  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  const {
    data: nesResumes,
    isLoading,
    isError,
    refetch,
  } = useGetResumeQuery({
    position,
    year,
    category,
    limit,
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
  useEffect(() => {
    if (!nesResumes || isLoading) return

    if (limit === 6) {
      setResumes(nesResumes)
    } else {
      setResumes((prev) => {
        const existingIds = new Set(prev.map((resume) => resume.id))
        const newItems = nesResumes.filter(
          (resume: any) => !existingIds.has(resume.id),
        )
        return [...prev, ...newItems]
      })
    }
  }, [nesResumes, isLoading, limit])

  useEffect(() => {
    // setResumes([])
    setLimit(8)
    checkLike()
    checkBookmark()
    refetch()
  }, [position, year, category])

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 8)
    }
  }, [inView])

  if (isLoading && resumes.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonResumeFolder key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  if (isError) {
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
          resume={resume}
          likeList={likeList}
          onLikeUpdate={handleLikeUpdate}
          bookmarkList={bookmarkList}
          onBookmarkUpdate={handleBookmarkUpdate}
        />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  )
}
