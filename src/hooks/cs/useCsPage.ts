'use client'

import { useMemo } from 'react'
import { useCsProblemDetailQuery } from '@/api/cs'

interface UseCsPageProps {
  id: string
}

export const useCsPage = ({ id }: UseCsPageProps) => {
  const { data: problemDetail } = useCsProblemDetailQuery(Number(id))

  // answered 필드로 답변 제출 여부 확인
  const submitted = useMemo(() => {
    if (!problemDetail) return false
    return problemDetail.answered
  }, [problemDetail])

  return {
    problemDetail,
    submitted,
  }
}
