'use client'

import { useRouter } from 'next/navigation'
import { useTodayCsQuery } from '@/api/cs'

export const useTodayCs = () => {
  const router = useRouter()
  const { data: todayCs, isLoading, error } = useTodayCsQuery()

  const handleNavigateToProblem = () => {
    if (todayCs) {
      router.push(`/cs/${todayCs.problemId}`)
    }
  }

  return {
    todayCs,
    isLoading,
    error,
    handleNavigateToProblem,
  }
}
