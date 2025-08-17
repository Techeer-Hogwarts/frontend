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
  solution: string
  isAnswered: boolean
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
