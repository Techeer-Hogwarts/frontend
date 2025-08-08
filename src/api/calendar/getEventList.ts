import { CalendarEventCardProps } from '@/components/calender/CalendarEventCard'
import { useQuery } from '@tanstack/react-query'

const getEvents = async ({
  keyword,
  category,
  offset,
  limit,
  cursor,
}: {
  keyword?: string
  category?: string[]
  offset?: number
  limit?: number
  cursor?: number
}): Promise<CalendarEventCardProps[]> => {
  const params = new URLSearchParams()

  if (keyword) params.append('keyword', keyword)
  category?.forEach((cat) => params.append('category', cat))

  // 커서가 있으면 cursorId를 사용, 없으면 offset 사용
  if (cursor) {
    params.append('cursorId', cursor.toString())
  } else if (offset !== undefined) {
    params.append('offset', offset.toString())
  }

  if (limit !== undefined) params.append('limit', limit.toString())

  const response = await fetch(`/events?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(
      `이벤트 목록 조회 실패: ${response.status} ${response.statusText}`,
    )
  }

  const result = await response.json()
  return result.content || result.data || result
}

const useGetEvents = ({
  keyword,
  category,
  offset = 0,
  limit = 10,
  cursor,
}: {
  keyword?: string
  category?: string[]
  offset?: number
  limit?: number
  cursor?: number
}) => {
  return useQuery({
    queryKey: ['events', keyword, category, offset, limit, cursor],
    queryFn: () => getEvents({ keyword, category, offset, limit, cursor }),
  })
}

export default useGetEvents
