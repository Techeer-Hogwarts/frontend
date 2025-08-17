'use client'

import { useState, useRef, useEffect } from 'react'
import ProblemFilterTabs from './Filter'
import CsQuestionBox from './CsQuestionBox'
import { useCsProblemListQuery } from '@/api/cs'

export default function CsQuestionList() {
  const [solvedFilter, setSolvedFilter] = useState<
    'solved' | 'unsolved' | null
  >(null)

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsProblemListQuery({
    size: 10,
  })

  // 모든 페이지의 문제들을 하나의 배열로 합치기
  const allProblems = data?.pages.flatMap((page) => page.problems) || []

  // 무한스크롤을 위한 ref
  const observerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer를 사용한 무한스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1, // 10% 보이면 트리거
        rootMargin: '100px', // 100px 전에 미리 로드
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between">
          <h2 className="text-[2rem] font-bold">CS List</h2>
        </div>
        <div className="border-t my-5" />
        <div className="text-center py-8">로딩 중...</div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section>
        <div className="flex justify-between">
          <h2 className="text-[2rem] font-bold">CS List</h2>
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
        <h2 className="text-[2rem] font-bold">CS List</h2>
      </div>
      <div className="border-t my-5" />
      <ProblemFilterTabs
        solvedFilter={solvedFilter}
        setSolvedFilter={setSolvedFilter}
      />
      <CsQuestionBox problems={allProblems} solvedFilter={solvedFilter} />

      {/* 무한스크롤 감지 요소 */}
      {hasNextPage && (
        <div
          ref={observerRef}
          className="h-10 flex items-center justify-center"
        >
          {isFetchingNextPage && <div className="text-gray">로딩 중...</div>}
        </div>
      )}
    </section>
  )
}
