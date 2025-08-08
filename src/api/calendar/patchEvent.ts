import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EventData } from './postEvent'

const patchEvent = async (
  eventId: number,
  eventData: EventData,
): Promise<void> => {
  const response = await fetch(`/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`이벤트 수정 실패: ${response.status}`)
  }
}

const usePatchEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      eventId,
      eventData,
    }: {
      eventId: number
      eventData: EventData
    }) => patchEvent(eventId, eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (error) => {},
  })
}

export default usePatchEvent
