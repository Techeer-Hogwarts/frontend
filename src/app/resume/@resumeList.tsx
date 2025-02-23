import { useGetResumeQuery } from './query/useGetResumeQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ResumeQueryParams } from '@/types/queryParams'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Resume {
  id: number
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
}: ResumeQueryParams = {}) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [limit, setLimit] = useState(8)
  const [ref, inView] = useInView({ threshold: 0.1 })

  const { data, isLoading, isError } = useGetResumeQuery({
    position,
    year,
    category,
    limit,
  })
  useEffect(() => {
    setResumes([])
    setLimit(8)
  }, [position, year, category])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setResumes((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newResumes = data.filter((p) => !existingIds.has(p.id)) // 중복 제거
        return [...prev, ...newResumes]
      })
    }
  }, [data])

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 4)
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

  if (isError || (data && resumes.length === 0)) {
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
        <ResumeFolder key={resume.id} resume={resume} />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  )
}
