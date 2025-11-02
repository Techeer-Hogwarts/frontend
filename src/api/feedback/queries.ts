// src/api/feedback/queries.ts

import {
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { feedbackKeys } from './keys'
import {
  getFeedbackById,
  getMentorGuidelines,
  getMyFeedbackRequests,
  getReceivedFeedbackRequests,
} from './apis'

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
