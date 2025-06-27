import { useQuery } from '@tanstack/react-query'
import { getBootcampList } from '@/api/bootcamp/getBootcampList'

interface Params {
  isAward: boolean
  year: number
  cursorId?: number
  limit?: number
}

export const useGetBootcampList = ({
  isAward,
  year,
  cursorId = 0,
  limit = 10,
}: Params) => {
  return useQuery({
    queryKey: ['bootcampList', { isAward, year, cursorId, limit }],
    queryFn: () => getBootcampList({ isAward, year, cursorId, limit }),
    staleTime: 1000 * 60 * 5,
  })
}
