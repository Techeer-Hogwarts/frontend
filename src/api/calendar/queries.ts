import { useQuery } from '@tanstack/react-query'
import { getCurrentUser, getEvent, getEvents } from './apis'
import { CalendarEventCardProps } from '@/components/calendar/CalendarEventCard'

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  })
}

export const useGetEvent = (eventId?: number) => {
  return useQuery<CalendarEventCardProps>({
    queryKey: ['events', eventId],
    queryFn: () => getEvent(eventId!),
    enabled: eventId !== undefined,
  })
}

export const useGetEvents = ({
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
