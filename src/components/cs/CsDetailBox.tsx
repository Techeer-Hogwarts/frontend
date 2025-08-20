'use client'

import { useCsDetailBox } from '@/hooks/cs/useCsDetailBox'
import { useTodayCsQuery } from '@/api/cs/queries'
import { useProblemDate } from '@/hooks/cs/useProblemDate'

interface CSDetailBoxProps {
  id: string
}

export default function CSDetailBox({ id }: CSDetailBoxProps) {
  const {
    answer,
    setAnswer,
    problemDetail,
    isLoading,
    error,
    submitAnswerMutation,
    handleSubmit,
  } = useCsDetailBox({ id })

  // 오늘의 CS 문제 조회 (금주의 CS 판단용)
  const { data: todayCs } = useTodayCsQuery()

  // 현재 문제가 금주의 CS인지 판단
  const isCurrentWeekCS = todayCs?.problemId === Number(id)

  // 공통 훅 사용
  const { getProblemDate } = useProblemDate(problemDetail?.updatedAt || '')

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">
            {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
          </h1>
        </div>
        <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !problemDetail) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">
            {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
          </h1>
        </div>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-[2rem] font-bold">
          {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
        </h1>
        <p className="text-lg text-gray">{getProblemDate()}</p>
      </div>

      <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
        <p>{problemDetail.content}</p>
      </div>

      <div className="mb-5">
        <p className="text-xl font-semibold text-primary mb-3">답변</p>
        <textarea
          placeholder="답변을 작성해주세요"
          className="w-full h-[12rem] border border-gray rounded-xl p-4 resize-none focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitAnswerMutation.isPending}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!answer.trim() || submitAnswerMutation.isPending}
        className={`w-full h-[3rem] rounded-xl text-white ${
          answer.trim() && !submitAnswerMutation.isPending
            ? 'bg-primary hover:bg-darkPrimary'
            : 'bg-lightgray'
        }`}
      >
        {submitAnswerMutation.isPending ? '제출 중...' : '제출'}
      </button>
    </div>
  )
}
