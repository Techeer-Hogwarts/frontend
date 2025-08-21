'use client'

import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { CsProblem } from '@/api/cs'
import { useProblemDate } from '@/hooks/cs/useProblemDate'

interface CsQuestionBoxProps {
  problem: CsProblem
  onNavigate: (problemId: number) => void
}

export default function CsQuestionBox({
  problem,
  onNavigate,
}: CsQuestionBoxProps) {
  const { getProblemDate } = useProblemDate(problem.updatedAt)

  return (
    <li>
      <button
        onClick={() => onNavigate(problem.problemId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onNavigate(problem.problemId)
          }
        }}
        className={`w-full text-left cursor-pointer border rounded-xl px-6 py-7 border-gray ${
          problem.isAnswered ? 'bg-filterbg' : 'bg-white'
        } hover:border-primary transition-colors`}
        aria-label={`${problem.isAnswered ? '해결된' : '미해결'} CS 문제: ${problem.content}`}
      >
        <div className="flex justify-between items-center">
          {problem.isAnswered ? (
            <FaCheckCircle className="w-5 h-5 text-primary" />
          ) : (
            <FaRegCircle className="w-5 h-5 text-gray" />
          )}
          <div className="flex justify-between w-[70.625rem] items-center">
            <p
              className={`${problem.isAnswered ? 'text-gray' : 'text-black'} px-5 max-w-[62.5rem]`}
            >
              {problem.content}
            </p>
            <p className="text-gray">{getProblemDate()}</p>
          </div>
        </div>
      </button>
    </li>
  )
}
