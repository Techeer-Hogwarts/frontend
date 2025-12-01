// src/api/feedback/types.ts

export interface UserInfo {
  name: string;
  nickname: string;
  profileImage: string;
}

export interface FeedbackResponse {
  id: number;
  type: 'RESUME' | 'ONEONONE';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requester: UserInfo;
  recipient: UserInfo;
  applicationReason: string;
  firstPreferredTime?: string;
  secondPreferredTime?: string;
  thirdPreferredTime?: string;
  confirmedTime?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateFeedbackRequest {
  type: 'RESUME' | 'ONEONONE';
  firstPreferredTime?: string;
  secondPreferredTime?: string;
  thirdPreferredTime?: string;
  applicationReason: string;
}

export interface MentorInfo {
  id: number;
  name: string;
  email: string;
  feedbackNotes: string;
  mainPosition: string;
  subPosition: string;
}

export interface MentorGuidelinesResponse {
  mentors: MentorInfo[];
}

export interface UpdateMentorGuidelinesRequest {
  feedbackNotes: string;
}

export interface FeedbackListResponse {
  feedbacks: FeedbackResponse[];
  totalCount: number;
}

export interface CreateFeedbackRequest {
  recipientId: number;
  type: 'RESUME' | 'ONEONONE';
  firstPreferredTime?: string;
  secondPreferredTime?: string;
  thirdPreferredTime?: string;
  applicationReason: string;
}

export interface RejectFeedbackRequest {
  rejectionReason: string;
}

export interface ApproveFeedbackRequest {
  timeChoice: 1 | 2 | 3;
}

export interface FeedbackCursorResponse {
  feedbacks: FeedbackResponse[];
  hasNext: boolean;
  nextCursor: number;
}
