'use client'

import { useState, useMemo } from 'react'
import { useCsProblemListQuery } from '@/api/cs'
import { useTodayCsQuery } from '@/api/cs/queries'

export const useCsQuestionList = () => {
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

  // 오늘의 CS 문제 조회 (금주의 CS 제외용)
  const { data: todayCs } = useTodayCsQuery()

  // 모든 페이지의 문제들을 하나의 배열로 합치고 금주의 CS 제외
  const allProblems = useMemo(() => {
    const problems = data?.pages.flatMap((page) => page.problems) || []

    // 금주의 CS 문제 ID가 있다면 제외
    if (todayCs?.problemId) {
      return problems.filter(
        (problem) => problem.problemId !== todayCs.problemId,
      )
    }

    return problems
  }, [data?.pages, todayCs?.problemId])

  return {
    solvedFilter,
    setSolvedFilter,
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allProblems,
  }
}
