export const getSessions = async (query: string, category: string) => {
  const baseUrl = 'https://api.techeerzip.cloud/api/v1/sessions'
  const params = {
    keyword: query,
    category,
    date: '',
    position: '',
    offset: '0',
    limit: '10',
  }
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== '',
    ),
  )
  const queryString = new URLSearchParams(filteredParams).toString()
  const url = `${baseUrl}?${queryString}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('세션 데이터를 가져오는 데 실패했습니다.')
  }
  const result = await response.json()
  return result.data
}
