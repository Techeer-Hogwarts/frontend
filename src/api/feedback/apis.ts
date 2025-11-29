import {
  FeedbackResponse,
  UpdateFeedbackRequest,
  MentorGuidelinesResponse,
  UpdateMentorGuidelinesRequest,
  FeedbackListResponse,
  CreateFeedbackRequest,
  RejectFeedbackRequest,
  ApproveFeedbackRequest,
  FeedbackCursorResponse,
} from './types'

const FEEDBACK_API_BASE = '/api/feedbacks'

// 피드백 요청 단일 조회
export const getFeedbackById = async (
  feedbackId: number,
): Promise<FeedbackResponse> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/${feedbackId}`)

  if (!response.ok) {
    throw new Error('피드백 요청을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 피드백 요청 수정
export const updateFeedback = async (
  feedbackId: number,
  data: UpdateFeedbackRequest,
): Promise<void> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/${feedbackId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('피드백 요청 수정에 실패했습니다.')
  }
}

// 피드백 요청 삭제
export const deleteFeedback = async (feedbackId: number): Promise<void> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/${feedbackId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('피드백 요청 삭제에 실패했습니다.')
  }
}

// 멘토별 피드백 유의사항 조회
export const getMentorGuidelines =
  async (): Promise<MentorGuidelinesResponse> => {
    const response = await fetch(`${FEEDBACK_API_BASE}/mentors/guidelines`)

    if (!response.ok) {
      throw new Error('멘토별 피드백 유의사항을 불러오는데 실패했습니다.')
    }

    return response.json()
  }

// 멘토용: 피드백 유의사항 작성/수정
export const updateMentorGuidelines = async (
  data: UpdateMentorGuidelinesRequest,
): Promise<void> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/mentors/guidelines`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('피드백 유의사항 작성/수정에 실패했습니다.')
  }
}

// 나의 피드백 요청 리스트 조회
export const getMyFeedbackRequests =
  async (): Promise<FeedbackListResponse> => {
    const response = await fetch(FEEDBACK_API_BASE)

    if (!response.ok) {
      throw new Error('나의 피드백 요청 리스트를 불러오는데 실패했습니다.')
    }

    return response.json()
  }

// 피드백 요청하기
export const createFeedbackRequest = async (
  data: CreateFeedbackRequest,
): Promise<void> => {
  const response = await fetch(FEEDBACK_API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('피드백 요청에 실패했습니다.')
  }
}

// 멘토용: 피드백 요청 반려
export const rejectFeedback = async (
  feedbackId: number,
  data: RejectFeedbackRequest,
): Promise<void> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/${feedbackId}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('피드백 요청 반려에 실패했습니다.')
  }
}

// 멘토용: 피드백 요청 수락
export const approveFeedback = async (
  feedbackId: number,
  data: ApproveFeedbackRequest,
): Promise<void> => {
  const response = await fetch(`${FEEDBACK_API_BASE}/${feedbackId}/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('피드백 요청 수락에 실패했습니다.')
  }
}

// 멘토용: 피드백 요청 목록 조회
export const getReceivedFeedbackRequests = async (params: {
  status?: string
  cursor?: number
  limit?: number
}): Promise<FeedbackCursorResponse> => {
  const searchParams = new URLSearchParams()

  if (params.status) searchParams.append('status', params.status)
  if (params.cursor) searchParams.append('cursor', params.cursor.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())

  const url = `${FEEDBACK_API_BASE}/mentor${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('받은 피드백 요청 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}
