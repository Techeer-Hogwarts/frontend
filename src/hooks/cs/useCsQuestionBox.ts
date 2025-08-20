'use client'

import { useRouter } from 'next/navigation'
import { CsProblem } from '@/api/cs'

interface UseCsQuestionBoxProps {
  problems: CsProblem[]
  solvedFilter: 'solved' | 'unsolved' | null
}

export const useCsQuestionBox = ({
  problems,
  solvedFilter,
}: UseCsQuestionBoxProps) => {
  const router = useRouter()

  const filtered =
    solvedFilter === null
      ? problems
      : problems.filter((p) =>
          solvedFilter === 'solved' ? p.isAnswered : !p.isAnswered,
        )

  const handleNavigateToProblem = (problemId: number) => {
    router.push(`/cs/${problemId}`)
  }

  return {
    filtered,
    handleNavigateToProblem,
  }
}
