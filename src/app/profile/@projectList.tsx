import ProfileCard from '@/components/profile/ProfileCard' // 경로는 실제 파일 위치에 맞게 조정
import { useGetProfileQuery } from './query/useGetProfileQuery'

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
  offset: number
  limit: number
}

export default function ProfileList({
  position = '',
  year,
  university = '',
  grade = '',
  offset,
  limit,
}: ProfileQueryParams) {
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
    return <div>Loading...</div> // 로딩 중일 때 표시할 문구
  }

  if (isError) {
    return <div>프로필 데이터를 가져오는 데 오류가 발생했습니다.</div> // 오류 발생 시 표시할 문구
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
