// src/api/feedback/queries.ts

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { feedbackKeys } from './keys'
import {
  approveFeedback,
  deleteFeedback,
  getFeedbackById,
  getMentorGuidelines,
  getMyFeedbackRequests,
  getReceivedFeedbackRequests,
  rejectFeedback,
  updateFeedback,
} from './apis'
import {
  ApproveFeedbackRequest,
  RejectFeedbackRequest,
  UpdateFeedbackRequest,
} from './types'

// 피드백 요청 단일 조회
export const useFeedbackByIdQuery = (feedbackId: number) => {
  return useQuery({
    queryKey: feedbackKeys.feedbackById(feedbackId),
    queryFn: () => getFeedbackById(feedbackId),
    enabled: !!feedbackId,
  })
}

// 멘토별 피드백 유의사항 조회
export const useMentorGuidelinesQuery = () => {
  return useQuery({
    queryKey: feedbackKeys.mentorGuidelines(),
    queryFn: getMentorGuidelines,
  })
}

// 나의 피드백 요청 리스트 조회
export const useMyFeedbackRequestsQuery = () => {
  return useQuery({
    queryKey: feedbackKeys.myFeedbacks(),
    queryFn: getMyFeedbackRequests,
  })
}

// 피드백 요청 수정
export const useUpdateFeedbackMutation = (feedbackId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateFeedbackRequest) =>
      updateFeedback(feedbackId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.feedbackById(feedbackId),
      })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.myFeedbacks() })
    },
  })
}

// 피드백 요청 삭제
export const useDeleteFeedbackMutation = (feedbackId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.myFeedbacks() })
    },
  })
}

// 멘토가 받은 피드백 목록 조회 (무한 스크롤)
export const useReceivedFeedbacksQuery = (params: {
  status?: string
  limit?: number
}) => {
  return useInfiniteQuery({
    queryKey: feedbackKeys.receivedFeedbacks(params),
    queryFn: ({ pageParam }) =>
      getReceivedFeedbackRequests({ ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

// 멘토용: 피드백 요청 수락
export const useApproveFeedbackMutation = (feedbackId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ApproveFeedbackRequest) =>
      approveFeedback(feedbackId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.receivedFeedbacks(),
      })
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.feedbackById(feedbackId),
      })
    },
  })
}

// 멘토용: 피드백 요청 반려
export const useRejectFeedbackMutation = (feedbackId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: RejectFeedbackRequest) =>
      rejectFeedback(feedbackId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.receivedFeedbacks(),
      })
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.feedbackById(feedbackId),
      })
    },
  })
}
