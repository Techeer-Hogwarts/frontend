'use client'

import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

interface Problem {
  id: number
  title: string
  date: string
  solved: boolean
}

interface ProblemListProps {
  problems: Problem[]
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
          solvedFilter === 'solved' ? p.solved : !p.solved,
        )

  return (
    <ul className="space-y-5">
      {filtered.map((p) => (
        <li
          key={p.id}
          onClick={() => router.push(`/cs/${p.id}`)}
          className={`cursor-pointer border rounded-xl px-6 py-7 border-gray ${p.solved ? 'bg-filterbg' : 'bg-white'}`}
        >
          <div className="flex justify-between items-center">
            {p.solved ? (
              <FaCheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <FaRegCircle className="w-5 h-5 text-gray" />
            )}
            <div className="flex justify-between w-[70.625rem] items-center">
              <p
                className={`${p.solved ? 'text-gray' : 'text-black'} px-5 max-w-[62.5rem]`}
              >
                {p.title}
              </p>
              <p className="text-gray">{p.date}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
