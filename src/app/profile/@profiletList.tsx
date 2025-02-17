import ProfileCard from '@/components/profile/ProfileCard'
import { useGetProfileQuery } from './query/useGetProfileQuery'
import SkeletonProfileCard from '../../components/profile/SkeletonProfileCard'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ProfileQueryParams } from '@/types/queryParams'

interface Profile {
  id: number
  // userId: number
  name: string
  mainPosition: string
  profileImage: string
  school: string
  grade: string
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

  console.log('isLoading:', isLoading)
  console.log('isError:', isError)
  console.log('profiles:', data, Array.isArray(data), data?.length)

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
  console.log('API 응답 데이터:', data)

  if (isError || !data || !Array.isArray(data) || data.length === 0) {
    console.error('데이터 로드 실패 또는 빈 배열:', data)
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="검색한 데이터가 없습니다."
          link="다시 검색해주세요"
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
          userId={profile.id}
          name={profile.name}
          mainPosition={profile.mainPosition}
          profileImage={profile.profileImage}
          school={profile.school}
          class={profile.grade}
        />
      ))}
    </div>
  )
}
