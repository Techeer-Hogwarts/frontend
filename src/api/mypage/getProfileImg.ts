import {
  GetProfileImageRequest,
  GetProfileImageResponse,
} from '@/types/mypage/mypage.types'

export const getProfileImg = async (
  request: GetProfileImageRequest,
): Promise<GetProfileImageResponse> => {
  const response = await fetch('/api/users/profileImage', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => null)
    throw new Error(
      errData?.message || `프로필 이미지 동기화 실패: ${response.status}`,
    )
  }

  return response.json()
}
