'use client'

import CsQuestionList from './CsQuestionList'
import { useTodayCs } from '@/hooks/cs/useTodayCs'
import { useProblemDate } from '@/hooks/cs/useProblemDate'

export default function TodayCSBox() {
  const { todayCs, isLoading, error, handleNavigateToProblem } = useTodayCs()

  const { getProblemDate } = useProblemDate(todayCs?.updatedAt || '')

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
        <p className="text-lg text-gray">{getProblemDate()}</p>
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
