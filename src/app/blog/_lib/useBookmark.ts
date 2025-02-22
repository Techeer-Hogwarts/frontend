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
      console.error(err)
      throw err
    }
  }

  const fetchBookmarks = async (
    category: string,
    offset: number,
    limit: number,
  ) => {
    try {
      const response = await fetch(
        `${API_URL}?category=${category}&offset=${offset}&limit=${limit}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      )

      if (!response.ok) throw new Error('북마크 조회 중 오류 발생')

      const data = await response.json()
      return data
    } catch (err: any) {
      console.error(err)
      throw err
    }
  }

  return { postBookmark, fetchBookmarks }
}
