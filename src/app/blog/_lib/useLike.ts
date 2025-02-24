const API_URL = '/api/v1/Likes'

export function useLike() {
  const postLike = async (
    contentId: number,
    category: string,
    likeStatus: boolean,
  ) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentId, category, likeStatus }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('좋아요 처리 중 오류 발생')
    } catch (err: any) {
      throw err
    }
  }

  const fetchLikes = async (
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

      if (!response.ok) throw new Error('좋아요 조회 중 오류 발생')

      const data = await response.json()
      return data
    } catch (err: any) {
      throw err
    }
  }

  return { postLike, fetchLikes }
}
