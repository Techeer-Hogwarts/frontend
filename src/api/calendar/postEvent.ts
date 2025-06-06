import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface EventData {
  category: string
  title: string
  startDate: string
  endDate: string
  url: string
}

const postEvent = async (eventData: EventData): Promise<void> => {
  const response = await fetch('/api/v1/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`이벤트 생성 실패: ${response.status}`)
  }
}

const usePostEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (error) => {},
  })
}

export default usePostEvent
