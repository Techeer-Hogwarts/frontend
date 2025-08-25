export interface RecentEvent {
  eventId: number
  eventUrl: string
  title: string
  date: string
}

export interface RecentEventsParams {
  date: string // yyyy-mm-dd 형식
  limit?: number
}

export const getRecentEvents = async (
  params: RecentEventsParams,
): Promise<RecentEvent[]> => {
  const { date, limit = 5 } = params

  const queryParams = new URLSearchParams()
  queryParams.append('date', date)
  queryParams.append('limit', limit.toString())

  const response = await fetch(
    `/api/v1/events/recent?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `최근 이벤트 조회 실패: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
