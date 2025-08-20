'use client'

import { useState, useMemo } from 'react'
import { useCsProblemListQuery } from '@/api/cs'

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

  // 모든 페이지의 문제들을 하나의 배열로 합치기
  const allProblems = data?.pages.flatMap((page) => page.problems) || []

  // 문제 개수 계산
  const { solvedCount, unsolvedCount } = useMemo(() => {
    const solved = allProblems.filter((problem) => problem.isAnswered).length
    const unsolved = allProblems.filter((problem) => !problem.isAnswered).length
    return { solvedCount: solved, unsolvedCount: unsolved }
  }, [allProblems])

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
    solvedCount,
    unsolvedCount,
  }
}
