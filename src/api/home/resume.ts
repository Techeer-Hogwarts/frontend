export interface Resume {
  id: number
  title: string
  author: string
  createdAt: string
  updatedAt: string
  viewCount: number
  likeCount: number
  thumbnail?: string
}

export const getLatestResumes = async (
  limit: number = 4,
): Promise<Resume[]> => {
  try {
    const response = await fetch(
      `/api/v1/resumes?limit=${limit}&sortBy=CREATEDAT`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.resumes || data
  } catch (error) {
    throw error
  }
}
