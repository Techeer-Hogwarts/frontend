// Project 관련 queryKey 생성 함수들
export const projectKeys = {
  // 모든 Project 관련 키의 기본값
  all: ['project'] as const,

  // 프로젝트 관련 키
  projects: () => [...projectKeys.all, 'projects'] as const,
  projectDetail: (id: number) =>
    [...projectKeys.projects(), 'detail', id] as const,
  projectMembers: (id: number) =>
    [...projectKeys.projects(), 'members', id] as const,
  projectApplicants: (id: number) =>
    [...projectKeys.projects(), 'applicants', id] as const,

  // 프로젝트 액션 관련 키
  projectActions: () => [...projectKeys.all, 'actions'] as const,
} as const
