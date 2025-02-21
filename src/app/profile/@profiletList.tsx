import ProfileCard from '@/components/profile/ProfileCard'
import { useGetProfileQuery } from './query/useGetProfileQuery'
import SkeletonProfileCard from '../../components/profile/SkeletonProfileCard'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ProfileQueryParams } from '@/types/queryParams'

interface Profile {
  id: number
  profileImage: string
  name: string
  school: string
  grade: string
  mainPosition: string
  year: number
  stack: string[]
  projectTeams: {
    mainImage: string
  }
}

export default function ProfileList({
  position = [],
  year = [],
  university = [],
  grade = [],
  offset,
  limit,
}: ProfileQueryParams = {}) {
  const { data, isLoading, isError } = useGetProfileQuery({
    position,
    year,
    university,
    grade,
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
          <SkeletonProfileCard key={skeleton.id} />
        ))}
      </div>
    )
  }

  if (isError || !data || !Array.isArray(data) || data.length === 0) {
    console.error('데이터 로드 실패 또는 빈 배열:', data)
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="프로필 데이터가 없습니다."
          link="다시 조회해주세요"
        />
      </div>
    ) // 오류 발생 시 표시할 문구
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((profile: Profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          name={profile.name}
          mainPosition={profile.mainPosition}
          profileImage={profile.profileImage}
          school={profile.school}
          grade={profile.grade}
          year={profile.year}
          stack={profile.stack}
          mainImage={profile.projectTeams.mainImage}
        />
      ))}
    </div>
  )
}
