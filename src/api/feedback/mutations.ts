// src/api/feedback/mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackKeys } from './keys';
import {
  createFeedbackRequest,
  updateFeedback,
  deleteFeedback,
  updateMentorGuidelines,
  rejectFeedback,
  approveFeedback,
} from './apis';
import {
  CreateFeedbackRequest,
  UpdateFeedbackRequest,
  UpdateMentorGuidelinesRequest,
  RejectFeedbackRequest,
  ApproveFeedbackRequest,
} from './types';

// 피드백 요청하기
export const useCreateFeedbackRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFeedbackRequest) => createFeedbackRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.myFeedbacks() });
    },
  });
};

// 피드백 요청 수정
export const useUpdateFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      feedbackId,
      data,
    }: {
      feedbackId: number;
      data: UpdateFeedbackRequest;
    }) => updateFeedback(feedbackId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.feedbackById(variables.feedbackId) });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.myFeedbacks() });
    },
  });
};

// 피드백 요청 삭제
export const useDeleteFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedbackId: number) => deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.myFeedbacks() });
    },
  });
};

// 멘토용: 피드백 유의사항 작성/수정
export const useUpdateMentorGuidelinesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMentorGuidelinesRequest) => updateMentorGuidelines(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.mentorGuidelines() });
    },
  });
};

// 멘토용: 피드백 요청 반려
export const useRejectFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      feedbackId,
      data,
    }: {
      feedbackId: number;
      data: RejectFeedbackRequest;
    }) => rejectFeedback(feedbackId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.feedbackById(variables.feedbackId) });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.receivedFeedbacks({}) });
    },
  });
};

// 멘토용: 피드백 요청 수락
export const useApproveFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      feedbackId,
      data,
    }: {
      feedbackId: number;
      data: ApproveFeedbackRequest;
    }) => approveFeedback(feedbackId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.feedbackById(variables.feedbackId) });
      queryClient.invalidateQueries({ queryKey: feedbackKeys.receivedFeedbacks({}) });
    },
  });
};
