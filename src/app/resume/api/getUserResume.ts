export const fetchUserResumes = async (
  userId: number,
  cursor?: number,
  limit: number = 10,
): Promise<{
  data: Array<{
    id: number
    title: string
    url: string
    isMain: boolean
    category: string
    position: string
    likeCount: number
    viewCount: number
    createdAt: string
    updatedAt: string
    user: {
      name: string
      nickname: string
      profileImage: string
    }
  }>
  nextCursor: number
  hasNext: boolean
}> => {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams()
    if (cursor !== undefined) {
      params.append('cursor', cursor.toString())
    }
    params.append('limit', limit.toString())

    const queryString = params.toString()
    const url = `/api/v1/resumes/user/${userId}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resumes for user. Status: ${response.status}`,
      )
    }

    const result = await response.json()
    return result // 새로운 API 응답 구조 그대로 반환
  } catch (error: any) {
    throw error
  }
}
