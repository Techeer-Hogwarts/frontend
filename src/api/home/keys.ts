// 홈 페이지 관련 queryKey 생성 함수들

// 쿼리 파라미터 타입 정의
interface TeamQueryParams {
  teamTypes?: string[]
  limit?: number
  sortType?: string
  cursor?: number
}

interface BlogQueryParams {
  limit?: number
  cursor?: number
}

interface ResumeQueryParams {
  limit?: number
  cursor?: number
}

export const homeKeys = {
  // 모든 홈 관련 키의 기본값
  all: ['home'] as const,

  // CS 관련 키
  cs: () => [...homeKeys.all, 'cs'] as const,
  todayCs: () => [...homeKeys.cs(), 'today'] as const,

  // 이벤트 관련 키
  events: () => [...homeKeys.all, 'events'] as const,
  recentEvents: (limit: number) =>
    [...homeKeys.events(), 'recent', limit] as const,

  // 팀 관련 키
  teams: () => [...homeKeys.all, 'teams'] as const,
  allTeams: (params: Readonly<TeamQueryParams>) =>
    [...homeKeys.teams(), 'all', params] as const,
  projectTeams: (limit: number) =>
    [...homeKeys.teams(), 'projects', limit] as const,
  studyTeams: (limit: number) =>
    [...homeKeys.teams(), 'studies', limit] as const,

  // 블로그 관련 키
  blog: () => [...homeKeys.all, 'blog'] as const,
  blogList: (params: Readonly<BlogQueryParams>) =>
    [...homeKeys.blog(), 'list', params] as const,

  // 이력서 관련 키
  resume: () => [...homeKeys.all, 'resume'] as const,
  resumeList: (params: Readonly<ResumeQueryParams>) =>
    [...homeKeys.resume(), 'list', params] as const,

  // 랭킹 관련 키
  rankings: () => [...homeKeys.all, 'rankings'] as const,
  monthlyRankings: (year: number, month: number) =>
    [...homeKeys.rankings(), 'monthly', year, month] as const,

  // 검색 관련 키
  search: () => [...homeKeys.all, 'search'] as const,
  basicSearch: (query: string) =>
    [...homeKeys.search(), 'basic', query] as const,
  finalSearch: (query: string) =>
    [...homeKeys.search(), 'final', query] as const,
} as const
