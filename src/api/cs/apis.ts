import {
  TodayCsResponse,
  CsProblemListParams,
  CsProblemListResponse,
  CsProblemDetail,
  CsAnswerSubmitRequest,
  CsAnswerListParams,
  CsAnswerListResponse,
  CsCommentSubmitRequest,
  CsComment,
  CsCommentListParams,
  CsCommentListResponse,
} from './types'

const CS_API_BASE = '/api/today-cs'

// 최신 CS 문제 조회
export const getTodayCs = async (): Promise<TodayCsResponse> => {
  const response = await fetch(`${CS_API_BASE}/today`)

  if (!response.ok) {
    throw new Error('오늘의 CS 문제를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 문제 목록 조회
export const getCsProblemList = async (
  params: CsProblemListParams,
): Promise<CsProblemListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.append('cursor', params.cursor.toString())
  if (params.size) searchParams.append('size', params.size.toString())

  const url = `${CS_API_BASE}/problems${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('CS 문제 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 문제 상세 조회
export const getCsProblemDetail = async (
  problemId: number,
): Promise<CsProblemDetail> => {
  const response = await fetch(`${CS_API_BASE}/problems/${problemId}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('존재하지 않는 문제입니다.')
    }
    throw new Error('CS 문제 상세 정보를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 답변 제출
export const submitCsAnswer = async (
  problemId: number,
  data: CsAnswerSubmitRequest,
): Promise<void> => {
  const response = await fetch(`${CS_API_BASE}/problems/${problemId}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(errorData.errors.content)
    }
    throw new Error('CS 답변 제출에 실패했습니다.')
  }
}

// CS 답변 목록 조회
export const getCsAnswerList = async (
  problemId: number,
  params: CsAnswerListParams,
): Promise<CsAnswerListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.append('cursor', params.cursor.toString())
  if (params.size) searchParams.append('size', params.size.toString())
  if (params.sortBy) searchParams.append('sortBy', params.sortBy)

  const url = `${CS_API_BASE}/problems/${problemId}/answers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('CS 답변 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 댓글 작성
export const submitCsComment = async (
  answerId: number,
  data: CsCommentSubmitRequest,
): Promise<CsComment> => {
  const response = await fetch(`${CS_API_BASE}/answers/${answerId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    if (response.status === 400) {
      const errorData = await response.json()
      throw new Error(errorData.errors.content)
    }
    throw new Error('CS 댓글 작성에 실패했습니다.')
  }

  return response.json()
}

// CS 댓글 목록 조회
export const getCsCommentList = async (
  answerId: number,
  params: CsCommentListParams,
): Promise<CsCommentListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.append('cursor', params.cursor.toString())
  if (params.size) searchParams.append('size', params.size.toString())

  const url = `${CS_API_BASE}/answers/${answerId}/comments${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('CS 댓글 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 답변 수정 API
export const updateCsAnswer = async (
  answerId: number,
  data: CsAnswerSubmitRequest,
): Promise<void> => {
  const response = await fetch(`${CS_API_BASE}/answers/${answerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update answer')
  }
}

// 답변 삭제 API
export const deleteCsAnswer = async (answerId: number): Promise<void> => {
  const response = await fetch(`${CS_API_BASE}/answers/${answerId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to delete answer')
  }
}

// 댓글 수정 API
export const updateCsComment = async (
  commentId: number,
  data: CsCommentSubmitRequest,
): Promise<void> => {
  const response = await fetch(`${CS_API_BASE}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update comment')
  }
}

// 댓글 삭제 API
export const deleteCsComment = async (commentId: number): Promise<void> => {
  const response = await fetch(`${CS_API_BASE}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to delete comment')
  }
}
