import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query'
import { getBootcampList } from '@/api/bootcamp/getBootcampList'
import { BootcampType } from '@/types/bootcamp/bootcamp'

export interface BootcampListResponse {
  data: BootcampType[]
  hasNext: boolean
  nextCursor: number
  currentBootcampYear: number
  isParticipate: boolean
}

interface Params {
  isAward: boolean
  year?: number
  limit?: number
}

export const useGetBootcampList = ({ isAward, year, limit = 10 }: Params) => {
  const queryResult = useInfiniteQuery<
    BootcampListResponse,
    Error,
    InfiniteData<BootcampListResponse, number>,
    [string, { isAward: boolean; year?: number }],
    number
  >({
    queryKey: ['bootcampList', { isAward, year }],
    queryFn: ({ pageParam = 0 }) =>
      getBootcampList({
        isAward,
        year,
        cursorId: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) => {
      // API 응답의 nextCursor 값을 사용
      if (!lastPage.hasNext) return undefined
      return lastPage.nextCursor
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  })

  return {
    ...queryResult,
    isLoading: queryResult.isLoading,
  }
}
