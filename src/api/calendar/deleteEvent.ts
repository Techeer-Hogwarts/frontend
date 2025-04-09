import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteEvent = async (eventId: number) => {
  const response = await fetch(`/api/v1/events/${eventId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`이벤트 삭제 실패: ${response.status}`)
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (error: Error) => {},
  })
}

export default useDeleteEvent
