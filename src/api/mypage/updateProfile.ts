import { UpdateProfilePayload } from '@/types/mypage/mypage.types'

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const response = await fetch('/api/users', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('항목을 모두 입력해주세요.')
    }
    throw new Error(`프로필 업데이트 실패: ${response.status}`)
  }

  return response
}
