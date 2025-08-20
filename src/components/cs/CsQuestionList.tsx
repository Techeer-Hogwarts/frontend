'use client'

import ProblemFilterTabs from './Filter'
import CsQuestionBox from './CsQuestionBox'
import { useCsQuestionList } from '@/hooks/cs/useCsQuestionList'
import { useInfiniteScroll } from '@/hooks/cs/useInfiniteScroll'
import { useMemo } from 'react'
import { CsProblem } from '@/api/cs'

export default function CsQuestionList() {
  const {
    solvedFilter,
    setSolvedFilter,
    allProblems,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsQuestionList()

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  // 필터링된 문제 목록
  const filteredProblems = useMemo(() => {
    if (!solvedFilter) return allProblems

    return allProblems.filter((problem: CsProblem) => {
      if (solvedFilter === 'solved') return problem.isAnswered
      if (solvedFilter === 'unsolved') return !problem.isAnswered
      return true
    })
  }, [allProblems, solvedFilter])

  // 문제 클릭 핸들러
  const handleNavigateToProblem = (problemId: number) => {
    window.location.href = `/cs/${problemId}`
  }

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

  if (error) {
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

      <ul className="space-y-5">
        {filteredProblems.map((problem) => (
          <CsQuestionBox
            key={problem.problemId}
            problem={problem}
            onNavigate={handleNavigateToProblem}
          />
        ))}
      </ul>

      {/* 무한스크롤 감지 요소 */}
      {hasNextPage && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && <div className="text-gray">로딩 중...</div>}
        </div>
      )}
    </section>
  )
}
