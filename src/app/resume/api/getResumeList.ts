import { ResumeQueryParams } from '@/types/queryParams'

export async function getResumeList({
  position = [],
  year = [],
  category = '전체',
  cursorId,
  limit = 10,
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

    // category가 undefined이거나 null일 때 기본값 처리
    const safeCategory = category || '전체'
    const mappedCategory = categoryMap[safeCategory] || ''

    // 카테고리가 빈 문자열이 아닐 때만 파라미터에 추가
    if (mappedCategory) {
      params.append('category', mappedCategory)
    }

    if (cursorId != undefined) {
      params.append('cursorId', cursorId.toString())
    }
    params.append('limit', limit.toString())

    const response = await fetch(`/api/v3/resumes?${params.toString()}`, {
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

    const result = await response.json()
    return result
  } catch (error) {
    throw error // 에러를 호출한 함수에 다시 전달
  }
}
