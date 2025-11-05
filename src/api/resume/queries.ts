import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  getResumeList,
  fetchResumeById,
  fetchBestResumes,
  fetchUserResumes,
} from './apis'
import { ResumeQueryParams } from './types'
import { resumeKeys } from './keys'

// 이력서 목록 조회 (무한 스크롤)
export const useResumeListQuery = ({
  position = [],
  year = [],
  category = '전체',
  sortBy = 'CREATEDAT',
  initialLimit = 10,
  pageLimit = 12,
}: ResumeQueryParams & {
  initialLimit?: number
  pageLimit?: number
}) => {
  return useInfiniteQuery({
    queryKey: [
      ...resumeKeys.list({ position, year, category, sortBy }),
      { initialLimit, pageLimit },
    ],
    queryFn: ({ pageParam }) => {
      // 첫 페이지는 initialLimit, 이후 페이지는 pageLimit
      const limit = !pageParam ? initialLimit : pageLimit
      return getResumeList({
        position,
        year,
        category,
        cursorId: pageParam,
        limit,
        sortBy,
      })
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 이력서 상세 조회
export const useResumeDetailQuery = (resumeId: number) => {
  return useQuery({
    queryKey: resumeKeys.detail(resumeId),
    queryFn: () => fetchResumeById(resumeId),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
    enabled: !!resumeId, // resumeId가 있을 때만 실행
  })
}

// 인기 이력서 목록 조회 (무한 스크롤)
export const useBestResumeListQuery = (
  setAuthModalOpen: (open: boolean) => void,
  limit: number = 12,
) => {
  return useInfiniteQuery({
    queryKey: [...resumeKeys.bestList(), limit],
    queryFn: ({ pageParam }) =>
      fetchBestResumes(pageParam, limit, setAuthModalOpen),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 사용자 이력서 목록 조회 (무한 스크롤)
export const useUserResumeListQuery = (userId: number, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: [...resumeKeys.userList(userId), limit],
    queryFn: ({ pageParam }) => fetchUserResumes(userId, pageParam, limit),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!userId, // userId가 있을 때만 실행
  })
}
