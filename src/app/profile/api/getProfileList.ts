export async function getProfileList({
  position,
  year,
  university,
  grade,
  offset = 0,
  limit = 10,
}: {
  position?: string
  year?: number
  university?: string
  grade?: string
  offset?: number
  limit?: number
}) {
  try {
    // URLSearchParams를 사용하여 동적으로 쿼리 문자열 생성
    const queryParams = new URLSearchParams()

    if (position) queryParams.set('position', position)
    if (year) queryParams.set('year', year.toString())
    if (university) queryParams.set('university', university)
    if (grade) queryParams.set('grade', grade)
    queryParams.set('offset', offset.toString())
    queryParams.set('limit', limit.toString())

    // 최종 URL 생성
    const url = `/api/v1/users/profiles?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: 프로필 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()

    console.log('프로필 목록 조회 성공:', data)
    return data?.data || []
  } catch (error) {
    console.error('프로필 목록 조회 실패:', error)
    throw error // 에러를 호출한 함수에 다시 전달
  }
}
