import { useQuery } from '@tanstack/react-query'
import { getProfileList } from '../api/getProfileList'
import { ProfileQueryParams } from '@/types/queryParams'

export function useGetProfileQuery({
  position = [],
  year = [],
  university = [],
  grade = [],
  cursorId,
  limit,
  sortBy,
}: ProfileQueryParams) {
  return useQuery({
    queryKey: ['profiles', position, year, university, grade, sortBy, cursorId, limit], // 고유 쿼리 키에 파라미터 추가
    queryFn: () => getProfileList({ position, year, university, grade, cursorId, limit, sortBy }), // 파라미터 전달
    staleTime: 10 * 1000, // 10초 동안 fresh
    // cacheTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    retry: 0, // 실패 시 재시도 횟수 설정
    refetchOnReconnect: true, // 연결 복구 시 다시 요청 (옵션)
    refetchOnWindowFocus: true, // 창에 포커스될 때 다시 요청 (옵션)
  })
}
