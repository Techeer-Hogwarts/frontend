export const getSessions = async (
  query: string,
  category: string,
  newLimit: number,
  date: string[],
  position: string[],
) => {
  const baseUrl = '/api/v1/sessions'
  const params = {
    keyword: query,
    category,
    offset: '0',
    limit: String(newLimit),
  }

  // URLSearchParams 사용하여 배열을 개별 파라미터로 추가
  const searchParams = new URLSearchParams(params)
  date.forEach((d) => searchParams.append('date', d))
  position.forEach((p) => searchParams.append('position', p))
  const url = `${baseUrl}?${searchParams.toString()}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('세션 데이터를 가져오는 데 실패했습니다.')
  }
  const result = await response.json()
  return result
}
