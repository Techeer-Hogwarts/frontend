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

// 블로그 삭제 API
const deleteBlog = async (id: string) => {
  const response = await fetch(`/api/v1/blogs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'accept': '*/*',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '블로그 삭제 실패')
  }

  return response
}

export const useDeleteBlogAPI = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
}

// 블로그 인기글 조회와 목록 조회 API
const getBlogs = async (newLimit: number, category: string, cursor?: number, sortBy?: string) => {
  let url = '/api/v1/blogs'
  if (category === '금주의 블로그') {
    url = '/api/v1/blogs/best'
  }

  const params: Record<string, string> = {
    limit: newLimit.toString(),
    ...(category !== '전체보기' && category ? { category } : {}),
    ...(sortBy ? { sortBy } : {}),
  }

  // 커서가 있으면 cursorId 추가 (첫 요청은 cursorId 없이)
  if (cursor) {
    params.cursorId = String(cursor)
  }

  const searchParams = new URLSearchParams(params)
  const response = await fetch(`${url}?${searchParams}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '블로그 데이터 로딩 실패')
  }

  const result = await response.json()

  // 금주의 블로그의 경우 배열로 온다면 그대로 반환
  if (category === '금주의 블로그' && Array.isArray(result)) {
    return result
  }

  return result
}

export const useGetBlogsAPI = (newLimit: number, category: string, cursor?: number, sortBy?: string) => {
  return useQuery({
    queryKey: ['blogs', newLimit, category, cursor, sortBy],
    queryFn: () => getBlogs(newLimit, category, cursor, sortBy),
    staleTime: 1000, // 1초 동안 캐시된 데이터 사용
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
