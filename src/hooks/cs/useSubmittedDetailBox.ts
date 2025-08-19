'use client'

import { useCsProblemDetailQuery, useCsAnswerListQuery } from '@/api/cs'

interface UseSubmittedDetailBoxProps {
  id: string
}

export const useSubmittedDetailBox = ({ id }: UseSubmittedDetailBoxProps) => {
  const {
    data: problemDetail,
    isLoading: problemLoading,
    error: problemError,
  } = useCsProblemDetailQuery(Number(id))

  const {
    data: answerListData,
    isLoading: answerLoading,
    error: answerError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsAnswerListQuery(Number(id), {
    size: 10,
    sortBy: 'UPDATE_AT_DESC',
  })

  // 모든 답변을 하나의 배열로 합치기 (내 답변 + 다른 답변들)
  const allAnswers = answerListData?.pages.flatMap((page) => page.answers) || []
  const myAnswer = answerListData?.pages[0]?.myAnswer

  return {
    problemDetail,
    problemLoading,
    problemError,
    answerListData,
    answerLoading,
    answerError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allAnswers,
    myAnswer,
  }
}
