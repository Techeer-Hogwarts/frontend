import { ProfileQueryParams } from '@/types/queryParams'

export async function getProfileList({
  position = [],
  year = [],
  university = [],
  grade = [],
  cursorId,
  limit: limit,
  sortBy = 'year',
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

    params.append('limit', (limit ?? 12).toString()) // undefined 방지
    params.append('sortBy', sortBy)

    if (cursorId !== undefined) {
      params.append('cursorId', cursorId.toString())
    }

    const response = await fetch(`/api/users/profiles?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
    })
    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        `Error: 프로필 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    return {
      profiles: result.profiles,
      hasNext: result.hasNext,
      nextCursor: result.nextCursor,
    }
  } catch (error) {
    throw error
  }
}
