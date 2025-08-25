import {
  TodayCsResponse,
  Event,
  RecentEventsResponse,
  ProjectStudyTeamsResponse,
  BlogListResponse,
  ResumeListResponse,
  RankingsResponse,
  SearchResponse,
} from './types'

// CS 문제 관련 API
export const getTodayCs = async (): Promise<TodayCsResponse> => {
  const response = await fetch('/api/today-cs/today', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('오늘의 CS 문제를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 최신 CS 문제 조회 (별칭)
export const getLatestCSProblem = getTodayCs

// 이벤트 관련 API
export const getRecentEvents = async (limit: number): Promise<Event[]> => {
  // 현재 날짜를 yyyy-mm-dd 형식으로 가져오기
  const today = new Date().toISOString().split('T')[0]

  const response = await fetch(
    `/api/events/recent?date=${today}&limit=${limit}`,
    {
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('최근 이벤트를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 최신 블로그 포스트 조회
export const getLatestBlogPosts = async (
  limit: number = 4,
): Promise<BlogListResponse> => {
  const response = await fetch(`/api/blogs?limit=${limit}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('최신 블로그 포스트를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 최신 이력서 조회
export const getLatestResumes = async (
  limit: number = 4,
): Promise<ResumeListResponse> => {
  const response = await fetch(`/api/resumes?limit=${limit}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('최신 이력서를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 프로젝트/스터디 팀 관련 API
export const getAllTeams = async (params: {
  teamTypes?: string[]
  limit?: number
  sortType?: string
}): Promise<ProjectStudyTeamsResponse> => {
  const searchParams = new URLSearchParams()

  if (params.teamTypes && params.teamTypes.length > 0) {
    params.teamTypes.forEach((type) => searchParams.append('teamTypes', type))
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.sortType) {
    searchParams.append('sortType', params.sortType)
  }

  const url = `/api/projectTeams/allTeams${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('팀 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 블로그 관련 API
export const getBlogList = async (params: {
  limit?: number
  cursor?: number
}): Promise<BlogListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.cursor) {
    searchParams.append('cursor', params.cursor.toString())
  }

  const url = `/api/blogs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('블로그 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 이력서 관련 API
export const getResumeList = async (params: {
  limit?: number
  cursor?: number
}): Promise<ResumeListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.limit) {
    searchParams.append('limit', params.limit.toString())
  }
  if (params.cursor) {
    searchParams.append('cursor', params.cursor.toString())
  }

  const url = `/api/resumes${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('이력서 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 랭킹 관련 API
export const getRankings = async (
  year: number,
  month: number,
): Promise<RankingsResponse> => {
  const response = await fetch(
    `/api/statistics/rankings?year=${year}&month=${month}`,
    {
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('랭킹 데이터를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// 검색 관련 API
export const getBasicSearchResults = async (
  query: string,
): Promise<SearchResponse> => {
  const response = await fetch(
    `/api/search/basic?query=${encodeURIComponent(query)}`,
    {
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('검색 결과를 불러오는데 실패했습니다.')
  }

  return response.json()
}

export const getFinalSearchResults = async (
  query: string,
): Promise<SearchResponse> => {
  const response = await fetch(
    `/api/search/final?query=${encodeURIComponent(query)}`,
    {
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('최종 검색 결과를 불러오는데 실패했습니다.')
  }

  return response.json()
}
