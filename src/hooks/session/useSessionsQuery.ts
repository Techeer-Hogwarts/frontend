import { useQuery } from '@tanstack/react-query'
import { getBestSessions, getSessions } from '@/api/session/session'

interface UseSessionsQueryParams {
  limit: number
  activeOption: string
  selectedPeriodsP: string[]
  selectedPeriodsB: string[]
  selectedPeriodsPo: string[]
  setAuthModalOpen: (open: boolean) => void
  cursorId?: number
  sortBy: string
}

export const useSessionsQuery = ({
  activeOption,
  limit,
  selectedPeriodsP,
  selectedPeriodsB,
  selectedPeriodsPo,
  setAuthModalOpen,
  cursorId,
  sortBy,
}: UseSessionsQueryParams) => {
  const category =
    activeOption === '부트캠프'
      ? 'BOOTCAMP'
      : activeOption === '파트너스'
        ? 'PARTNERS'
        : ''

  return useQuery({
    queryKey: [
      'sessions',
      {
        activeOption,
        limit,
        selectedPeriodsB: Array.isArray(selectedPeriodsB)
          ? [...selectedPeriodsB]
          : [],
        selectedPeriodsP: Array.isArray(selectedPeriodsP)
          ? [...selectedPeriodsP]
          : [],
        selectedPeriodsPo: Array.isArray(selectedPeriodsPo)
          ? [...selectedPeriodsPo]
          : [],
        category,
        cursorId,
        sortBy
      },
    ],
    queryFn: async () => {
      if (activeOption === '금주의 세션') {
        const result = await getBestSessions(limit)
        return result
      }
      const date = [...selectedPeriodsP, ...selectedPeriodsB]
      const result = await getSessions(
        category,
        limit,
        date,
        selectedPeriodsPo,
        setAuthModalOpen,
        sortBy,
        cursorId,
      )
      // 전체 응답 객체 반환 (content, nextCursor, hasNext 포함)
      return result
    },
    staleTime: 1000, // 1초 동안 캐시된 데이터 사용
  })
}
