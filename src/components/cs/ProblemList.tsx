'use client'

import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { CsProblem } from '@/api/cs'

interface ProblemListProps {
  problems: CsProblem[]
  solvedFilter: 'solved' | 'unsolved' | null
}

export default function ProblemList({
  problems,
  solvedFilter,
}: ProblemListProps) {
  const router = useRouter()

  const filtered =
    solvedFilter === null
      ? problems
      : problems.filter((p) =>
          solvedFilter === 'solved' ? p.isAnswered : !p.isAnswered,
        )

  return (
    <ul className="space-y-5">
      {filtered.map((p) => (
        <li
          key={p.problemId}
          onClick={() => router.push(`/cs/${p.problemId}`)}
          className={`cursor-pointer border rounded-xl px-6 py-7 border-gray ${p.isAnswered ? 'bg-filterbg' : 'bg-white'}`}
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
              <p className="text-gray">
                {new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
