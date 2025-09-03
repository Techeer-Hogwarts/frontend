import { useQuery } from '@tanstack/react-query'
import { getResumeList } from './apis'
import { ResumeQueryParams } from './types'

export function useGetResumeQuery({
  position = [],
  year = [],
  category,
  cursorId,
  limit,
  sortBy,
}: ResumeQueryParams) {
  return useQuery({
    queryKey: ['resumes', position, year, category, cursorId, limit, sortBy],
    queryFn: () =>
      getResumeList({ position, year, category, cursorId, limit, sortBy }),
    staleTime: 10 * 1000, // 10초 동안 fresh
    // cacheTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    retry: 0, // 실패 시 재시도 횟수 설정
    refetchOnReconnect: false, // 연결 복구 시 다시 요청 (옵션)
    refetchOnWindowFocus: false, // 창에 포커스될 때 다시 요청 (옵션)
  })
}
