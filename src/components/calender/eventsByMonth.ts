interface Event {
  name: string
  period: string
}

interface EventsByMonth {
  [day: number]: Event[]
}

const eventsByMonth: Record<number, EventsByMonth> = {
  9: {
    // 9월 이벤트
    15: [
      { name: 'Event D', period: '09.15' },
      { name: 'Event E', period: '09.28 - 09.30' },
    ],
  },
  10: {
    // 10월 이벤트
    1: [
      { name: '카카오 파티', period: '09.28 - 09.30' },
      { name: '마리오 파티', period: '10.01 - 10.05' },
    ],
    4: [{ name: '파트너스 4기 모집', period: '09.28 - 09.30' }],
    5: [{ name: '파트너스 4기 모집', period: '09.28 - 09.30' }],
    6: [{ name: '파트너스 4기 모집', period: '09.28 - 09.30' }],
    15: [{ name: '테크톡 발표', period: '09.28 - 09.30' }],
  },
}

export default eventsByMonth
