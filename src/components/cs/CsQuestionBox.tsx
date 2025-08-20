'use client'

import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { CsProblem } from '@/api/cs'
import { useCsQuestionBox } from '@/hooks/cs/useCsQuestionBox'

interface ProblemListProps {
  problems: CsProblem[]
  solvedFilter: 'solved' | 'unsolved' | null
}

export default function CsQuestionBox({
  problems,
  solvedFilter,
}: ProblemListProps) {
  const { filtered, handleNavigateToProblem } = useCsQuestionBox({
    problems,
    solvedFilter,
  })

  // 문제의 날짜를 계산하는 함수
  const getProblemDate = (problem: CsProblem) => {
    let targetDate: Date
    // 백엔드에서 제공하는 실제 날짜 사용
    targetDate = new Date(problem.updatedAt)

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

  return (
    <ul className="space-y-5">
      {filtered.map((p) => (
        <li key={p.problemId}>
          <button
            onClick={() => handleNavigateToProblem(p.problemId)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleNavigateToProblem(p.problemId)
              }
            }}
            className={`w-full text-left cursor-pointer border rounded-xl px-6 py-7 border-gray ${
              p.isAnswered ? 'bg-filterbg' : 'bg-white'
            } hover:border-primary transition-colors`}
            aria-label={`${p.isAnswered ? '해결된' : '미해결'} CS 문제: ${p.content}`}
          >
            <div className="flex justify-between items-center">
              {p.isAnswered ? (
                <FaCheckCircle className="w-5 h-5 text-primary" />
              ) : (
                <FaRegCircle className="w-5 h-5 text-gray" />
              )}
              <div className="flex justify-between w-[70.625rem] items-center">
                <p
                  className={`${p.isAnswered ? 'text-gray' : 'text-black'} px-5 max-w-[62.5rem]`}
                >
                  {p.content}
                </p>
                <p className="text-gray">{getProblemDate(p)}</p>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
