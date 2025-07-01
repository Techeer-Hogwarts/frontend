import { useQuery } from '@tanstack/react-query'
import { getBootcampDetail } from '@/api/bootcamp/getBootcampDetail'

export const useGetBootcampDetail = (bootcampId: number) => {
  return useQuery({
    queryKey: ['bootcampDetail', bootcampId],
    queryFn: () => getBootcampDetail(bootcampId),
    enabled: !!bootcampId,
    staleTime: 1000 * 60 * 5,
  })
}
