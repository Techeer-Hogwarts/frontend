import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent, patchEvent, postEvent } from './apis'
import { EventData } from './apis'

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['home', 'events'] })
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
  })
}

export const usePatchEvent = () => {
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
      queryClient.invalidateQueries({ queryKey: ['home', 'events'] })
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
    onError: (error) => {},
  })
}

export const usePostEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['home', 'events'] })
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
    onError: (error) => {},
  })
}
