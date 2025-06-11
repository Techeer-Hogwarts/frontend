const API_URL = '/api/v1/bookmarks'

export function useBookmark() {
  const postBookmark = async (
    contentId: number,
    category: string,
    bookmarkStatus: boolean,
  ) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentId, category, bookmarkStatus }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('북마크 처리 중 오류 발생')
    } catch (err: any) {
      throw err
    }
  }

  const fetchBookmarks = async (
    category: string,
    cursorId: number,
    limit: number,
  ) => {
    try {
      const response = await fetch(
        `${API_URL}?category=${category}&cursorId=${cursorId}&limit=${limit}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      )

      if (!response.ok) throw new Error('북마크 조회 중 오류 발생')

      const data = await response.json()

      // 새로운 API 응답 구조에 맞게 처리
      return data?.data || data?.content || data || []
    } catch (err: any) {
      throw err
    }
  }

  return { postBookmark, fetchBookmarks }
}
