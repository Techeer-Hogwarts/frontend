export const getSearchResults = async (index: string, query: string) => {
  try {
    const res = await fetch(`/api/v2/search?index=${index}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error('단일검색 API 요청 실패')
    }
    return await res.json()
  } catch (error) {
    return []
  }
}

export const getBasicSearchResults = async (query: string) => {
  try {
    const res = await fetch(`/api/v2/search/basic?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error('검색 API 요청 실패')
    }
    return await res.json()
  } catch (error) {
    return []
  }
}

export const getFinalSearchResults = async (query: string) => {
  try {
    const res = await fetch(
      `/api/v2/search/final?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    if (!res.ok) {
      throw new Error('최종 검색 API 요청 실패')
    }
    return await res.json()
  } catch (error) {
    return []
  }
}
