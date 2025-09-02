export interface SearchParams {
  index: string
  query: string
  offset?: number
  limit?: number
}

export interface SearchResult {
  id: string
  title: string
  url: string
  createdAt: string
  date: string
  userID: string
  userName: string
  userProfileImage: string
  index: string
  score: number
}

export const searchAPI = async ({
  index,
  query,
  offset = 0,
  limit = 10,
}: SearchParams): Promise<SearchResult[] | null> => {
  try {
    const response = await fetch(
      `/api/v2/search?index=${index}&query=${encodeURIComponent(
        query,
      )}&offset=${offset}&limit=${limit}`,
    )
    if (!response.ok) {
      throw new Error('검색 API 요청 실패')
    }

    const data: { results: SearchResult[] } = await response.json()
    // 런타임 보정: date 누락 시 createdAt으로 채움
    const normalized: SearchResult[] = (data.results ?? []).map((item) => ({
      ...item,
      date: item.date ?? item.createdAt,
    }))

    if (!normalized) return null
    // 중복 제거 (같은 URL을 가진 항목 중에서 최신 항목만 남김)
    const uniqueResults = Object.values(
      normalized.reduce(
        (acc: Record<string, SearchResult>, item: SearchResult) => {
          if (
            !acc[item.url] ||
            new Date(item.createdAt) > new Date(acc[item.url].createdAt)
          ) {
            acc[item.url] = item
          }
          return acc
        },
        {} as Record<string, SearchResult>, // 타입 명시 추가
      ),
    )

    // 최신순 정렬
    return uniqueResults.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  } catch (error) {
    return null
  }
}
