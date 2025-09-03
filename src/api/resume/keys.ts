// resume 관련 queryKey 생성 함수
export const resumeKeys = {
  // 모든 resume 관련 키의 기본값
  all: ['resume'] as const,

  lists: () => [...resumeKeys.all, 'list'] as const,
}
