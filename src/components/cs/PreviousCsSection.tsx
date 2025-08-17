'use client'

import { useState } from 'react'
import ProblemFilterTabs from './Filter'
import ProblemList from './ProblemList'
import { useCsProblemListQuery } from '@/api/cs'

export default function PreviousCSSection() {
  const [solvedFilter, setSolvedFilter] = useState<
    'solved' | 'unsolved' | null
  >(null)

  const { data: problemList } = useCsProblemListQuery({
    size: 20,
  })

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-[2rem] font-bold">이전 CS</h2>
      </div>
      <div className="border-t my-5" />
      <ProblemFilterTabs
        solvedFilter={solvedFilter}
        setSolvedFilter={setSolvedFilter}
      />
      <ProblemList
        problems={problemList.problems}
        solvedFilter={solvedFilter}
      />
    </section>
  )
}
