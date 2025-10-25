import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { homeKeys } from './keys'
import {
  getTodayCs,
  getRecentEvents,
  getAllTeams,
  getLatestBlogPosts,
  getLatestResumes,
  getBlogList,
  getResumeList,
  getRankings,
  getBasicSearchResults,
  getFinalSearchResults,
} from './apis'

// 오늘의 CS 문제 조회
export const useTodayCsQuery = () => {
  return useQuery({
    queryKey: homeKeys.todayCs(),
    queryFn: getTodayCs,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 최근 이벤트 조회
export const useRecentEventsQuery = (limit: number) => {
  return useQuery({
    queryKey: homeKeys.recentEvents(limit),
    queryFn: () => getRecentEvents(limit),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 모든 팀 조회 (무한 스크롤)
export const useAllTeamsQuery = (params: {
  teamTypes?: string[]
  limit?: number
  sortType?: string
}) => {
  return useInfiniteQuery({
    queryKey: homeKeys.allTeams(params),
    queryFn: ({ pageParam }) => getAllTeams({ ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextInfo.id ?? undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 최신 블로그 포스트 조회
export const useLatestBlogPostsQuery = (limit: number = 4) => {
  return useQuery({
    queryKey: [...homeKeys.blog(), 'latest', limit],
    queryFn: () => getLatestBlogPosts(limit),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 최신 이력서 조회
export const useLatestResumesQuery = (limit: number = 4) => {
  return useQuery({
    queryKey: [...homeKeys.resume(), 'latest', limit],
    queryFn: () => getLatestResumes(limit),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 블로그 목록 조회 (무한 스크롤)
export const useBlogListQuery = (params: {
  limit?: number
  cursor?: number
}) => {
  return useInfiniteQuery({
    queryKey: homeKeys.blogList(params),
    queryFn: ({ pageParam }) => getBlogList({ ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 이력서 목록 조회 (무한 스크롤)
export const useResumeListQuery = (params: {
  limit?: number
  cursor?: number
}) => {
  return useInfiniteQuery({
    queryKey: homeKeys.resumeList(params),
    queryFn: ({ pageParam }) => getResumeList({ ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 월별 랭킹 조회
export const useMonthlyRankingsQuery = (year: number, month: number) => {
  return useQuery({
    queryKey: homeKeys.monthlyRankings(year, month),
    queryFn: () => getRankings(year, month),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  })
}

// 기본 검색 결과 조회
export const useBasicSearchQuery = (query: string) => {
  return useQuery({
    queryKey: homeKeys.basicSearch(query),
    queryFn: () => getBasicSearchResults(query),
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
    enabled: !!query, // query가 있을 때만 실행
  })
}

// 최종 검색 결과 조회
export const useFinalSearchQuery = (query: string) => {
  return useQuery({
    queryKey: homeKeys.finalSearch(query),
    queryFn: () => getFinalSearchResults(query),
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
    enabled: !!query, // query가 있을 때만 실행
  })
}
