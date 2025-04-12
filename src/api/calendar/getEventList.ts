import { CalendarEventCardProps } from '@/components/calender/CalendarEventCard'
import { useQuery } from '@tanstack/react-query'

const getEvents = async ({
  keyword,
  category,
  offset,
  limit,
}: {
  keyword?: string
  category?: string[]
  offset?: number
  limit?: number
}): Promise<CalendarEventCardProps[]> => {
  const params = new URLSearchParams()

  if (keyword) params.append('keyword', keyword)
  category?.forEach((cat) => params.append('category', cat))
  if (offset !== undefined) params.append('offset', offset.toString())
  if (limit !== undefined) params.append('limit', limit.toString())

  const response = await fetch(`/api/v1/events?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(
      `이벤트 목록 조회 실패: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

const useGetEvents = ({
  keyword,
  category,
  offset = 0,
  limit = 10,
}: {
  keyword?: string
  category?: string[]
  offset?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: ['events', keyword, category, offset, limit],
    queryFn: () => getEvents({ keyword, category, offset, limit }),
  })
}

export default useGetEvents
