export async function fetchUserProfile(userId: number) {
  try {
    // API 경로를 동적 경로로 설정
    const response = await fetch(`/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(
        `Error: 유저 프로필 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()
    const dataWithWrapper = { data: data } // Back에서 data 필드 없시 바로 반환하기 때문에

    return dataWithWrapper?.data || []
  } catch (error) {
    throw error
  }
}
