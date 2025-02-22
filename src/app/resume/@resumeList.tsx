import { useGetResumeQuery } from './query/useGetResumeQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ResumeQueryParams } from '@/types/queryParams'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'

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
  offset,
  limit,
}: ResumeQueryParams = {}) {
  const { data, isLoading, isError } = useGetResumeQuery({
    position,
    year,
    category,
    offset,
    limit,
  })

  if (isLoading) {
    const skeletons = Array.from({ length: 8 }).map((_, i) => ({
      id: `skeleton-${i}`,
    }))
    return (
      <div className="grid grid-cols-4 gap-4">
        {skeletons.map((skeleton) => (
          <SkeletonResumeFolder key={skeleton.id} />
        ))}
      </div>
    )
  }

  if (isError || !data?.length) {
    console.error('데이터 로드 실패 또는 빈 배열:', data)
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
      {data?.map((resume: Resume) => (
        <ResumeFolder key={resume.id} resume={resume} />
      ))}
    </div>
  )
}
