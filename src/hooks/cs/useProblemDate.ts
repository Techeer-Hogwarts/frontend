'use client'

/**
 * CS 문제의 날짜를 계산하여 주차 정보를 반환하는 훅
 * @param updatedAt 문제의 업데이트 날짜
 * @returns 주차 정보 (예: "2024년 8월 1주차")
 */
export const useProblemDate = (updatedAt: string) => {
  const getProblemDate = () => {
    const targetDate = new Date(updatedAt)

    const year = targetDate.getFullYear()
    const month = targetDate.getMonth() + 1

    // 월의 첫 번째 날
    const firstDayOfMonth = new Date(year, month - 1, 1)
    // 월의 첫 번째 날이 주의 몇 번째 날인지 계산
    const firstDayWeekday = firstDayOfMonth.getDay()
    // 해당 날짜가 월의 몇 번째 주인지 계산
    const weekOfMonth = Math.ceil((targetDate.getDate() + firstDayWeekday) / 7)

    return `${year}년 ${month}월 ${weekOfMonth}주차`
  }

  return {
    getProblemDate,
  }
}
