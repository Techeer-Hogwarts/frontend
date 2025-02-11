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
}

export const useSessionsQuery = ({
  activeOption,
  inputValue,
  limit,
  selectedPeriodsP,
  selectedPeriodsB,
  selectedPeriodsPo,
}: UseSessionsQueryParams) => {
  const category =
    activeOption === '부트캠프'
      ? 'BOOTCAMP'
      : activeOption === '파트너스'
        ? 'PARTNERS'
        : activeOption === '전체보기'
          ? ''
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
        const data = await getBestSessions(limit)
        console.log('getBestSessions result:', data)
        return data ?? []
      }

      let date = ''
      if (activeOption === '부트캠프') {
        date = selectedPeriodsB[0] ?? ''
      } else if (activeOption === '파트너스') {
        date = selectedPeriodsP[0] ?? ''
      }
      // console.log('date:', date)
      // console.log('포지션:', selectedPeriodsPo[0] ?? '')
      // console.log('category:', category)
      // console.log('limit:', limit)
      // console.log('inputValue:', inputValue)
      const data = await getSessions(
        inputValue,
        category,
        limit,
        date,
        selectedPeriodsPo[0] ?? '',
      )
      // console.log('getSessions result:', data)
      return data ?? []
    },
  })
}
