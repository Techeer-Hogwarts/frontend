// CS 문제 기본 타입
export interface CsProblem {
  problemId: number
  content: string
  isAnswered: boolean
}

// CS 문제 상세 타입
export interface CsProblemDetail {
  id: number
  content: string
  solution: string | null
  answered: boolean
}

// CS 문제 목록 조회 파라미터
export interface CsProblemListParams {
  cursor?: number
  size?: number
}

// CS 문제 목록 응답
export interface CsProblemListResponse {
  problems: CsProblem[]
  hasNext: boolean
  nextCursor: number | null
}

// 오늘의 CS 문제 응답
export interface TodayCsResponse {
  problemId: number
  content: string
  isAnswered: boolean
}

// CS 답변 제출 요청 타입
export interface CsAnswerSubmitRequest {
  content: string
}

// CS 답변 목록 조회 파라미터
export interface CsAnswerListParams {
  cursor?: number
  size?: number
  sortBy?: 'UPDATE_AT_DESC' | 'LIKE_COUNT_DESC'
}

// CS 답변 사용자 정보
export interface CsAnswerUser {
  profileImage: string | null
  name: string
}

// CS 답변 정보
export interface CsAnswer {
  id: number
  content: string
  score: number
  feedback: string
  likeCount: number
  user: CsAnswerUser
  updateAt: string
  commentCount: number
}

// CS 답변 목록 응답
export interface CsAnswerListResponse {
  answers: CsAnswer[]
  hasNext: boolean
  nextCursor: number | null
  myAnswer: CsAnswer | null
}

// CS 댓글 작성 요청 타입
export interface CsCommentSubmitRequest {
  content: string
}

// CS 댓글 정보
export interface CsComment {
  id: number
  content: string
  likeCount: number
  user: CsAnswerUser
  createdAt: string
}
