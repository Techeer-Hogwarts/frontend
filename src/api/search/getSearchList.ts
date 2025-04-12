// getSearchList.ts
export const getSearchList = async (query: string) => {
  try {
    const response = await fetch(
      `/api/v2/search/final?query=${encodeURIComponent(query)}`,
      {
        method: 'GET', // GET 방식 요청
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.statusText}`)
    }

    const data = await response.json()
    return data // 결과 반환
  } catch (error) {
    throw new Error('Error fetching search list')
  }
}
