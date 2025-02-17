export async function getProfileList({
  position = [],
  year = [],
  university = [],
  grade = [],
  offset = 0,
  limit = 10,
}: {
  position?: string[]
  year?: string[]
  university?: string[]
  grade?: string[]
  offset?: number
  limit?: number
}) {
  try {
    // URLSearchParams에 배열 데이터를 추가하는 함수
    const params = new URLSearchParams()

    if (position.length > 0)
      position.forEach((p) => params.append('position', p))
    if (year.length > 0) year.forEach((y) => params.append('year', y))
    if (university.length > 0)
      university.forEach((u) => params.append('university', u))
    if (grade.length > 0) grade.forEach((g) => params.append('grade', g))

    params.append('offset', offset.toString())
    params.append('limit', limit.toString())

    const url = `/api/v1/users/profiles?${params.toString()}`

    console.log('API 요청 URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const jsonResponse = await response.json()
    const dataWithWrapper = { data: jsonResponse }
    console.log('테스트:', dataWithWrapper)
    console.log('API 응답 데이터:', jsonResponse)

    if (!response.ok) {
      throw new Error(
        `Error: 프로필 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    return dataWithWrapper?.data || []
  } catch (error) {
    console.error('프로필 목록 조회 실패:', error)
    throw error
  }
}
