import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

// 블로그 조회수 증가 API
const putBlog = async (id: number) => {
  const response = await fetch(`/api/blogs/${id}`, {
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
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      accept: '*/*',
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
const getBlogs = async (
  newLimit: number,
  category: string,
  cursor?: number,
  sortBy?: string,
) => {
  const url = '/api/blogs'

  const params: Record<string, string> = {
    limit: newLimit.toString(),
    ...(category !== '전체보기' && category
      ? { category: category === '금주의 블로그' ? 'BEST' : category }
      : {}),
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

export const useGetBlogsAPI = (
  newLimit: number,
  category: string,
  cursor?: number,
  sortBy?: string,
) => {
  return useQuery({
    queryKey: ['blogs', newLimit, category, cursor, sortBy],
    queryFn: () => getBlogs(newLimit, category, cursor, sortBy),
    staleTime: 1000, // 1초 동안 캐시된 데이터 사용
  })
}

// 블로그 글 추가 API
export const postBlogAPI = async (url: string) => {
  const blogUrl = encodeURIComponent(url)
  const response = await fetch(`/api/blogs?url=${blogUrl}`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  return response
}

// 블로깅 챌린지 신청 API
export type PostResult =
  | { success: true; message: string }
  | { success: false; message: string }

export const postBlogChallengeAPI = async (): Promise<PostResult> => {
  const now = new Date()
  const month = now.getMonth() + 1
  const currentYear = now.getFullYear()

  let year: number = currentYear
  let firstHalf: boolean

  if (month >= 3 && month <= 8) {
    firstHalf = true
  } else if (month >= 9 && month <= 12) {
    firstHalf = false
  } else if (month >= 1 && month <= 2) {
    year = currentYear - 1
    firstHalf = false
  } else {
    year = currentYear
    firstHalf = false
  }

  try {
    const response = await fetch('/api/tech-blogging/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ year, firstHalf }),
    })

    if (response.status === 200) {
      return { success: true, message: '블로깅 챌린지에 신청 완료!' }
    }

    if (response.status === 404) {
      return { success: false, message: '존재하지 않는 챌린지 기간입니다.' }
    }

    if (response.status === 409) {
      return { success: false, message: '이미 블로깅 챌린지에 참여 중입니다' }
    }

    const errorData = await response.json()
    return {
      success: false,
      message: `${response.status}: ${errorData.message || response.statusText}`,
    }
  } catch (err) {
    return {
      success: false,
      message: '신청 중 오류가 발생했습니다',
    }
  }
}

// 블로깅 챌린지 기간 조회 API
export const getBlogChallengeTermsAPI = async () => {
  const response = await fetch('/api/tech-blogging/terms', {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `${response.status} : ${errorData.message || response.statusText}`,
    )
  }
  return response.json()
}

// 블로깅 챌린지 특정 기간 조회 API
export const getBlogChallengeByTermAPI = async (termId: number) => {
  const response = await fetch(`/api/tech-blogging/terms/${termId}`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `${response.status} : ${errorData.message || response.statusText}`,
    )
  }
  return response.json()
}

// 블로깅 챌린지 기간 및 회차 요약 API
export const getBlogChallengeSummaryAPI = async (termId: number) => {
  const response = await fetch(`/api/tech-blogging/terms/${termId}/summary`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `${response.status} : ${errorData.message || response.statusText}`,
    )
  }
  return response.json()
}

// 블로깅 챌린지 출석 현황 조회 API
export const getBlogChallengeAttendanceAPI = async (termId?: number) => {
  const query =
    termId !== undefined && termId !== null ? `?termId=${termId}` : ''
  const response = await fetch(`/api/tech-blogging/terms/attendance${query}`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `${response.status} : ${errorData.message || response.statusText}`,
    )
  }
  return response.json()
}

export const getBlogChallengeBlogsAPI = async (
  sortBy: string,
  limit: number,
  cursorId?: number,
  termId?: number,
  roundId?: number,
) => {
  const queryParams = new URLSearchParams()

  // termId가 null이거나 undefined이면 현재 진행중인 챌린지 블로그 조회
  if (termId !== undefined && termId !== null) {
    queryParams.append('termId', termId.toString())
  }

  if (roundId !== undefined && roundId !== null) {
    queryParams.append('roundId', roundId.toString())
  }

  if (cursorId !== undefined && cursorId !== null) {
    queryParams.append('cursorId', cursorId.toString())
  }

  queryParams.append('limit', limit.toString())
  queryParams.append('sortBy', sortBy)

  const response = await fetch(
    `/api/tech-blogging/rounds/blogs?${queryParams.toString()}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `${response.status} : ${errorData.message || response.statusText}`,
    )
  }

  return response.json()
}
