// 이력서 통계
const getStatistics = async (userId: number, year: number) => {
  const params = new URLSearchParams({
    userId: String(userId),
    year: String(year),
  })
  const response = await fetch(`/api/statistics?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message || '통계 데이터를 불러오는데 실패했습니다.',
    )
  }
  return response.json()
}

import { useQuery } from '@tanstack/react-query'

export function useGetStatisticsAPI(userId?: number, year?: number) {
  return useQuery({
    queryKey: ['statistics', userId ?? null, year ?? null],
    enabled: userId != null && year != null,
    queryFn: () => {
      if (userId == null || year == null) throw new Error('missing params')
      return getStatistics(userId, year)
    },
  })
}
