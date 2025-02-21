export interface EventData {
    category: string
    title: string
    startDate: string
    endDate: string
    url: string
  }
  
  export async function postEvent(eventData: EventData): Promise<void> {
    try {
      const response = await fetch('/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
  
      if (!response.ok) {
        throw new Error(`이벤트 생성 실패: ${response.status}`)
      }

    } catch (error) {
      console.error('이벤트 생성 실패: ', error)
      throw error
    }
  }
