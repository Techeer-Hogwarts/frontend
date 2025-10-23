import { CalendarEventCardProps } from '@/components/calendar/CalendarEventCard'

// 이벤트 삭제
export const deleteEvent = async (eventId: number) => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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

// 최근 유저 정보 가져오기
export const getCurrentUser = async () => {
  const res = await fetch('/api/users', {
    method: 'GET',
    credentials: 'include', //사용자 식별, 로그인 확인
  })

  if (!res.ok) {
    throw new Error('사용자 정보를 불러오는 데 실패했습니다.')
  }

  return res.json()
}

//이벤트 조회
export const getEvent = async (
  eventId: number,
): Promise<CalendarEventCardProps> => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`이벤트 조회 실패: ${response.status}`)
  }

  return response.json()
}

//이벤트 목록 조회
export const getEvents = async ({
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

  const response = await fetch(`/api/events?${params}`, {
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

export const patchEvent = async (
  eventId: number,
  eventData: EventData,
): Promise<void> => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`이벤트 수정 실패: ${response.status}`)
  }
}

//이벤트 생성
export interface EventData {
  category: string
  title: string
  startDate: string
  endDate: string
  url: string
}

export const postEvent = async (eventData: EventData): Promise<void> => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`이벤트 생성 실패: ${response.status}`)
  }
}
