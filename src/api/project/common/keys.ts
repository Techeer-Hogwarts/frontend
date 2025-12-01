// Common 관련 queryKey 생성 함수들
export const commonKeys = {
  // 모든 Common 관련 키의 기본값
  all: ['common'] as const,

  // 팀 목록 관련 키
  teams: () => [...commonKeys.all, 'teams'] as const,
  teamList: (params: any) => [...commonKeys.teams(), 'list', params] as const,
  initialTeams: (params: any) =>
    [...commonKeys.teams(), 'initial', params] as const,
  nextTeams: (params: any) => [...commonKeys.teams(), 'next', params] as const,

  // 사용자 관련 키
  users: () => [...commonKeys.all, 'users'] as const,
  allUsers: () => [...commonKeys.users(), 'all'] as const,
  myInfo: () => [...commonKeys.users(), 'myInfo'] as const,

  // 스택 관련 키
  stacks: () => [...commonKeys.all, 'stacks'] as const,
  stackList: () => [...commonKeys.stacks(), 'list'] as const,
} as const
