import ProfileCard from '@/components/profile/ProfileCard' // 경로는 실제 파일 위치에 맞게 조정
import { useGetProfileQuery } from './query/useGetProfileQuery'
import SkeletonProfileCard from './SkeletonProfileCard'
import EmptyLottie from '@/components/common/EmptyLottie'

interface Profile {
  id: number
  userId: number
  name: string
  mainPosition: string
  profileImage: string
  school: string
  class: string
}

interface ProfileQueryParams {
  position?: string
  year?: number
  university?: string
  grade?: string
  offset?: number
  limit?: number
}

export default function ProfileList({
  position = '',
  year,
  university = '',
  grade = '',
  offset,
  limit,
}: ProfileQueryParams = {}) {
  const {
    data: profiles,
    isLoading,
    isError,
  } = useGetProfileQuery({
    position,
    year,
    university,
    grade,
    offset,
    limit,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonProfileCard key={index} />
        ))}
      </div>
    )
  }

  if (isError || profiles?.length === 0) {
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
      {profiles?.map((profile: Profile) => (
        <ProfileCard
          key={profile.id} // 고유한 key 값 설정
          id={profile.id}
          userId={profile.userId}
          name={profile.name}
          mainPosition={profile.mainPosition}
          profileImage={profile.profileImage}
          school={profile.school}
          class={profile.class}
        />
      ))}
    </div>
  )
}
