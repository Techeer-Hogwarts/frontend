export async function fetchResumes(
  position?: string,
  year?: number,
  offset: number = 0,
  limit: number = 10,
) {
  try {
    // URLSearchParams를 사용하여 동적으로 쿼리 문자열 생성
    const queryParams = new URLSearchParams()

    if (position) queryParams.set('position', position)
    if (year) queryParams.set('year', year.toString())
    queryParams.set('offset', offset.toString())
    queryParams.set('limit', limit.toString())

    // URL 문자열 생성
    const url = `/api/v1/resumes?${queryParams.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: 이력서 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()

    console.log('이력서 목록 조회 성공:', data)
    return data?.data || []
  } catch (error) {
    console.error('이력서 목록 조회 실패:', error)
    throw error // 에러를 호출한 함수에 다시 전달
  }
}
