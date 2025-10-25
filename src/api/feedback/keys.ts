// src/api/feedback/keys.ts

export const feedbackKeys = {
  all: ['feedback'] as const,
  
  // 내 피드백 목록
  myFeedbacks: () => [...feedbackKeys.all, 'my'] as const,
  
  // 피드백 상세
  feedbackById: (id: number) => [...feedbackKeys.all, 'detail', id] as const,

  // 멘토 가이드라인
  mentorGuidelines: () => [...feedbackKeys.all, 'mentor', 'guidelines'] as const,

  // 멘토에게 온 피드백 목록
  receivedFeedbacks: (params: any) => [...feedbackKeys.all, 'received', params] as const,
} as const;
