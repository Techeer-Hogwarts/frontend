import { CalendarEventCardProps } from '@/components/calender/CalendarEventCard'
import { useQuery } from '@tanstack/react-query'

const getEvent = async (eventId: number): Promise<CalendarEventCardProps> => {
  const response = await fetch(`/events/${eventId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`이벤트 조회 실패: ${response.status}`)
  }

  return response.json()
}

const useGetEvent = (eventId?: number) => {
  return useQuery<CalendarEventCardProps>({
    queryKey: ['events', eventId],
    queryFn: () => getEvent(eventId!),
    enabled: eventId !== undefined,
  })
}

export default useGetEvent
