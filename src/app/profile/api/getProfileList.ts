import { ProfileQueryParams } from '@/types/queryParams'

export async function getProfileList({
  position = [],
  year = [],
  university = [],
  grade = [],
  offset = 0,
  limit: limit,
}: ProfileQueryParams) {
  try {
    // URLSearchParams에 배열 데이터를 추가하는 함수
    const params = new URLSearchParams()

    if (position.length > 0)
      position.forEach((p) => params.append('position', p))
    if (year.length > 0) year.forEach((y) => params.append('year', y))
    if (university.length > 0)
      university.forEach((u) => params.append('university', u))
    if (grade.length > 0) grade.forEach((g) => params.append('grade', g))

    params.append('offset', (offset ?? 0).toString()) // undefined 방지
    params.append('limit', (limit ?? 10).toString()) // undefined 방지

    const response = await fetch(
      `/api/v1/users/profiles?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      },
    )
    const result = await response.json()
    const dataWithWrapper = { data: result } // Back에서 data 필드 없시 바로 반환하기 때문에

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
