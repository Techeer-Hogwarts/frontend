import { useQuery } from '@tanstack/react-query'
import { getSessions } from '@/app/session/_lib/getSessions'
import { getBestSessions } from '@/app/session/_lib/getBestSessions'

interface UseSessionsQueryParams {
  activeOption: string
  inputValue: string
  limit: number
  selectedPeriodsP: string[]
  selectedPeriodsB: string[]
  selectedPeriodsPo: string[]
  setAuthModalOpen: (open: boolean) => void
}

export const useSessionsQuery = ({
  activeOption,
  inputValue,
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
        inputValue,
        limit,
        selectedPeriodsP,
        selectedPeriodsB,
        selectedPeriodsPo,
        category,
      },
    ],
    queryFn: async () => {
      if (activeOption === '금주의 세션') {
        const data = await getBestSessions(limit, setAuthModalOpen)
        // console.log('getBestSessions result:', data)
        return data ?? []
      }
      const date = [...selectedPeriodsP, ...selectedPeriodsB]
      const data = await getSessions(
        inputValue,
        category,
        limit,
        date,
        selectedPeriodsPo, // 포지션 문자열
      )
      console.log('getSessions result:', data)
      return data ?? []
    },
  })
}
