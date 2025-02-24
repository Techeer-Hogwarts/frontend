import { ResumeQueryParams } from '@/types/queryParams'

export async function getResumeList({
  position = [],
  year = [],
  category = '',
  // offset = 0,
  limit: limit,
}: ResumeQueryParams) {
  try {
    // URLSearchParams를 사용하여 동적으로 쿼리 문자열 생성
    const params = new URLSearchParams()

    if (position.length > 0)
      position.forEach((p) => params.append('position', p))
    if (year.length > 0) year.forEach((y) => params.append('year', y))
    // 카테고리 변환 (한글 -> 영어)
    const categoryMap: { [key: string]: string } = {
      전체: '',
      이력서: 'RESUME',
      포트폴리오: 'PORTFOLIO',
      ICT: 'ICT',
      OTHER: 'OTHER',
    }

    const mappedCategory = categoryMap[category]
    params.append('category', mappedCategory)

    // params.append('offset', (offset ?? 0).toString()) // undefined 방지
    // params.append('limit', (limit ?? 10).toString()) // undefined 방지

    const response = await fetch(`/api/v1/resumes?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    const dataWithWrapper = { data: result } // Back에서 data 필드 없이 바로 반환하기 때문에

    if (!response.ok) {
      throw new Error(
        `Error: 이력서 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    return dataWithWrapper?.data || []
  } catch (error) {
    throw error // 에러를 호출한 함수에 다시 전달
  }
}
