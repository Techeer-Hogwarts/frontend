import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query'
import { getBootcampList } from '@/api/bootcamp/getBootcampList'
import { BootcampType } from '@/types/bootcamp/bootcamp'

export interface BootcampListResponse {
  data: BootcampType[]
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
      const data = lastPage.data
      if (!Array.isArray(data) || data.length === 0) return undefined
      return data[data.length - 1].id
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  })

  return {
    ...queryResult,
    isLoading: queryResult.isLoading,
  }
}
