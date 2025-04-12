import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// 블로그 조회수 증가 API
const putBlog = async (id: number) => {
  const response = await fetch(`/api/v1/blogs/${id}`, {
    method: 'PUT',
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '블로그 업데이트 실패')
  }

  return
}

export const usePutBlogAPI = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: putBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

// 블로그 인기글 조회와 목록 조회 API
const getBlogs = async (newLimit: number, category: string) => {
  let url = '/api/v1/blogs'
  if (category === '금주의 블로그') {
    url = '/api/v1/blogs/best'
  }

  const params = new URLSearchParams({
    offset: '0',
    limit: newLimit.toString(),
    ...(category !== '전체보기' && category ? { category } : {}),
  })

  const response = await fetch(`${url}?${params}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '블로그 데이터 로딩 실패')
  }

  return response.json()
}

export const useGetBlogsAPI = (newLimit: number, category: string) => {
  return useQuery({
    queryKey: ['blogs', newLimit, category],
    queryFn: () => getBlogs(newLimit, category),
  })
}

// 블로그 글 추가 API
export const postBlogAPI = async (url: string) => {
  const blogUrl = encodeURIComponent(url)
  const response = await fetch(`/api/v1/blogs?url=${blogUrl}`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  return response
}
