'use client'

import ProblemFilterTabs from './Filter'
import CsQuestionBox from './CsQuestionBox'
import { useCsQuestionList } from '@/hooks/cs/useCsQuestionList'
import { useInfiniteScroll } from '@/hooks/cs/useInfiniteScroll'

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
      <CsQuestionBox problems={allProblems} solvedFilter={solvedFilter} />

      {/* 무한스크롤 감지 요소 */}
      {hasNextPage && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && <div className="text-gray">로딩 중...</div>}
        </div>
      )}
    </section>
  )
}
