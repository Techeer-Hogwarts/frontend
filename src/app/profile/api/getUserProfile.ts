export async function fetchUserProfile(userId: number) {
  try {
    // API 경로를 동적 경로로 설정
    const response = await fetch(`/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: 유저 프로필 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()
    console.log('유저 프로필 조회 성공:', data)
    return data?.data || []
  } catch (error) {
    console.error('유저 프로필 조회 실패:', error)
    throw error
  }
}
