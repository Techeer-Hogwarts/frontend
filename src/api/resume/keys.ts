// resume 관련 queryKey 생성 함수
import type { ResumeQueryParams } from './types'

export const resumeKeys = {
  // 모든 이력서 관련 키의 기본값
  all: ['resumes'] as const,

  // 이력서 목록 키
  lists: () => [...resumeKeys.all, 'list'] as const,
  list: (params: ResumeQueryParams) => [...resumeKeys.lists(), params] as const,
  // 페이지별 쿼리 키
  page: (params: ResumeQueryParams, pageNumber: number) =>
    [...resumeKeys.list(params), 'page', pageNumber] as const,

  // 이력서 상세 키
  detail: (id: number) => [...resumeKeys.all, 'detail', id] as const,

  // 인기 이력서 목록 키
  bestList: () => [...resumeKeys.all, 'best'] as const,

  // 사용자 이력서 목록 키
  userList: (userId: number) => [...resumeKeys.all, 'user', userId] as const,
}
