'use client'

import { useState } from 'react'
import ProblemFilterTabs from './Filter'
import ProblemList from './ProblemList'
import { useCsProblemListQuery } from '@/api/cs'

export default function PreviousCSSection() {
  const [solvedFilter, setSolvedFilter] = useState<
    'solved' | 'unsolved' | null
  >(null)

  const {
    data: problemList,
    isLoading,
    error,
  } = useCsProblemListQuery({
    size: 20,
  })

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between">
          <h2 className="text-[2rem] font-bold">이전 CS</h2>
        </div>
        <div className="border-t my-5" />
        <div className="text-center py-8">로딩 중...</div>
      </section>
    )
  }

  if (error || !problemList) {
    return (
      <section>
        <div className="flex justify-between">
          <h2 className="text-[2rem] font-bold">이전 CS</h2>
        </div>
        <div className="border-t my-5" />
        <div className="text-center py-8 text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      </section>
    )
  }

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
