'use client'

import ProblemHeader from './ProblemHeader'

interface ProblemStatusProps {
  problemId: number
  updatedAt: string
  type: 'loading' | 'error'
  message?: string
}

export default function ProblemStatus({
  problemId,
  updatedAt,
  type,
  message,
}: ProblemStatusProps) {
  const defaultMessage =
    type === 'loading'
      ? '문제를 불러오는 중...'
      : '문제를 불러오는데 실패했습니다.'

  const containerClass =
    type === 'loading'
      ? 'border border-gray bg-filterbg'
      : 'border border-red-300 bg-red-50'

  // 에러 타입일 때는 message가 있으면 사용하고, 없으면 defaultMessage 사용
  const displayMessage = type === 'error' && message ? message : defaultMessage

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      {/* updatedAt이 있을 때만 ProblemHeader 표시 */}
      {updatedAt && (
        <ProblemHeader problemId={problemId} updatedAt={updatedAt} />
      )}
      <div
        className={`px-6 py-8 rounded-xl text-xl font-semibold mb-10 ${containerClass}`}
      >
        <p>{displayMessage}</p>
      </div>
    </div>
  )
}
