'use client'

/**
 * CS 문제의 날짜를 계산하여 주차 정보를 반환하는 훅
 * @param updatedAt 문제의 업데이트 날짜
 * @returns 주차 정보 (예: "2024년 9월 1주차")
 */
export const useProblemDate = (updatedAt: string) => {
  const getProblemDate = () => {
    // updatedAt이 빈 문자열이거나 유효하지 않은 경우 빈 문자열 반환
    if (!updatedAt || updatedAt.trim() === '') {
      return ''
    }

    const targetDate = new Date(updatedAt)

    // 유효하지 않은 날짜인 경우 빈 문자열 반환
    if (isNaN(targetDate.getTime())) {
      return ''
    }

    const year = targetDate.getFullYear()
    const month = targetDate.getMonth() + 1

    // 월의 첫 번째 날
    const firstDayOfMonth = new Date(year, month - 1, 1)

    // 월요일을 0, 일요일을 6으로 변환 (getDay()는 일요일이 0)
    const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7

    // 해당 날짜가 월의 몇 번째 주인지 계산 (월요일 기준)
    const weekOfMonth = Math.ceil((targetDate.getDate() + firstDayWeekday) / 7)

    return `${year}년 ${month}월 ${weekOfMonth}주차`
  }

  return {
    getProblemDate,
  }
}
