// 이력서 목록 기본 타입
export interface ResumeQueryParams {
  position?: string[]
  year?: string[]
  category?: string
  cursorId?: number
  limit?: number
  sortBy?: string
}
