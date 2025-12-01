// Study 관련 queryKey 생성 함수들
export const studyKeys = {
  // 모든 Study 관련 키의 기본값
  all: ['study'] as const,

  // 스터디 관련 키
  studies: () => [...studyKeys.all, 'studies'] as const,
  studyDetail: (id: number) => [...studyKeys.studies(), 'detail', id] as const,
  studyMembers: (id: number) =>
    [...studyKeys.studies(), 'members', id] as const,
  studyApplicants: (id: number) =>
    [...studyKeys.studies(), 'applicants', id] as const,

  // 스터디 액션 관련 키
  studyActions: () => [...studyKeys.all, 'actions'] as const,
} as const
