// CS 관련 queryKey 생성 함수들
export const csKeys = {
  // 모든 CS 관련 키의 기본값
  all: ['cs'] as const,

  // 오늘의 CS 문제 키
  today: () => [...csKeys.all, 'today'] as const,

  // 문제 관련 키
  problems: () => [...csKeys.all, 'problems'] as const,
  problemList: (params: any) => [...csKeys.problems(), 'list', params] as const,
  problemDetail: (id: number) => [...csKeys.problems(), 'detail', id] as const,
} as const
