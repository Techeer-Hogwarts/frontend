export interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  viewCount: number
  likeCount: number
}

export const getLatestBlogPosts = async (
  limit: number = 4,
): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`/api/v1/blogs?limit=${limit}&sortBy=latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.posts || data
  } catch (error) {
    throw error
  }
}
