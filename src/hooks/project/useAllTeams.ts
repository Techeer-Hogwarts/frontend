import { useQuery } from '@tanstack/react-query'
import { getAllTeams } from '@/api/project/common'
import type { TeamFilter, TeamsResponse } from '@/types/project/project'

/**
 * 팀 목록 조회
 * @param filters TeamFilter 객체
 */
export function useAllTeams(filters: TeamFilter) {
  return useQuery<TeamsResponse>({
    queryKey: ['getAllTeams', filters],
    queryFn: () => getAllTeams(filters),
    staleTime: 5 * 60 * 1000,
  })
}
