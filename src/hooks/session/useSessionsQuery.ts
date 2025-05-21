import { useQuery } from '@tanstack/react-query'
import { getBestSessions, getSessions } from '@/api/session/session'

interface UseSessionsQueryParams {
  limit: number
  activeOption: string
  selectedPeriodsP: string[]
  selectedPeriodsB: string[]
  selectedPeriodsPo: string[]
  setAuthModalOpen: (open: boolean) => void
}

export const useSessionsQuery = ({
  activeOption,
  limit,
  selectedPeriodsP,
  selectedPeriodsB,
  selectedPeriodsPo,
  setAuthModalOpen,
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
      },
    ],
    queryFn: async () => {
      if (activeOption === '금주의 세션') {
        const data = await getBestSessions(limit)
        return data ?? []
      }
      const date = [...selectedPeriodsP, ...selectedPeriodsB]
      const data = await getSessions(
        category,
        limit,
        date,
        selectedPeriodsPo,
        setAuthModalOpen, // 포지션 문자열
      )
      return data ?? []
    },
  })
}
