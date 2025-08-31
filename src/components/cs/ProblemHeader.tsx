'use client'

import { useTodayCsQuery } from '@/api/cs/queries'
import { useProblemDate } from '@/hooks/cs/useProblemDate'

interface ProblemHeaderProps {
  problemId: number
  updatedAt: string
}

export default function ProblemHeader({
  problemId,
  updatedAt,
}: ProblemHeaderProps) {
  // 오늘의 CS 문제 조회 (금주의 CS 판단용)
  const { data: todayCs } = useTodayCsQuery()

  // 현재 문제가 금주의 CS인지 판단
  const isCurrentWeekCS = todayCs?.problemId === problemId

  // 공통 훅 사용
  const { getProblemDate } = useProblemDate(updatedAt)

  return (
    <div className="flex items-center space-x-4 mb-5">
      <h1 className="text-[2rem] font-bold">
        {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
      </h1>
      {/* 날짜가 있을 때만 표시 */}
      {getProblemDate() && (
        <p className="text-lg text-gray">{getProblemDate()}</p>
      )}
    </div>
  )
}
