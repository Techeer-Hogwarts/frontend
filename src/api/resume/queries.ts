import { useInfiniteQuery } from '@tanstack/react-query'
import { getResumeList } from './apis'
import { ResumeQueryParams } from './types'
import { resumeKeys } from './keys'

// 이력서 목록 조회 (무한 스크롤)
export const useResumeListQuery = ({
  position = [],
  year = [],
  category = '전체',
  sortBy = 'CREATEDAT',
  initialLimit = 10,
  pageLimit = 12,
}: ResumeQueryParams & {
  initialLimit?: number
  pageLimit?: number
}) => {
  return useInfiniteQuery({
    queryKey: resumeKeys.list({ position, year, category, sortBy }),
    queryFn: ({ pageParam }) => {
      // 첫 페이지는 initialLimit, 이후 페이지는 pageLimit
      const limit = !pageParam ? initialLimit : pageLimit
      return getResumeList({
        position,
        year,
        category,
        cursorId: pageParam,
        limit,
        sortBy,
      })
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}
