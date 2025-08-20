'use client'

import CsQuestionList from './CsQuestionList'
import { useTodayCs } from '@/hooks/cs/useTodayCs'

export default function TodayCSBox() {
  const { todayCs, isLoading, error, handleNavigateToProblem } = useTodayCs()

  // 현재 날짜의 주차 계산
  const getCurrentWeek = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // getMonth()는 0부터 시작

    // 월의 첫 번째 날
    const firstDayOfMonth = new Date(year, month - 1, 1)

    // 월의 첫 번째 날이 주의 몇 번째 날인지 계산 (0: 일요일, 1: 월요일, ...)
    const firstDayWeekday = firstDayOfMonth.getDay()
    // 현재 날짜가 월의 몇 번째 주인지 계산
    const weekOfMonth = Math.ceil((now.getDate() + firstDayWeekday) / 7)

    return `${year}년 ${month}월 ${weekOfMonth}주차`
  }

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">금주의 CS</h1>
        </div>
        <div className="border border-primary px-6 py-8 rounded-xl text-xl font-semibold">
          <p>CS 문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !todayCs) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">금주의 CS</h1>
        </div>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold">
          <p>CS 문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-[2rem] font-bold">금주의 CS</h1>
        <p className="text-lg text-gray">{getCurrentWeek()}</p>
      </div>

      <div className="flex justify-between items-center mb-[3.5rem] border border-primary px-6 py-8 rounded-xl text-xl font-semibold">
        <p className="max-w-[56.25rem]">{todayCs.content}</p>
        <button
          onClick={handleNavigateToProblem}
          className="w-[12.5rem] h-[2.5rem] bg-primary text-white rounded-xl hover:bg-darkPrimary"
        >
          {todayCs.isAnswered ? '답변 보러가기' : 'CS 풀기'}
        </button>
      </div>

      <CsQuestionList />
    </div>
  )
}
