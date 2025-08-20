'use client'

import { useState } from 'react'
import { useCsProblemDetailQuery, useSubmitCsAnswerMutation } from '@/api/cs'
import { useRouter } from 'next/navigation'

interface UseCsDetailBoxProps {
  id: string
}

export const useCsDetailBox = ({ id }: UseCsDetailBoxProps) => {
  const [answer, setAnswer] = useState('')
  const router = useRouter()

  const {
    data: problemDetail,
    isLoading,
    error,
  } = useCsProblemDetailQuery(Number(id))

  const submitAnswerMutation = useSubmitCsAnswerMutation()

  const handleSubmit = async () => {
    if (!answer.trim()) return

    try {
      await submitAnswerMutation.mutateAsync({
        problemId: Number(id),
        data: { content: answer.trim() },
      })

      // 잠시 후 답변 확인 페이지로 이동
      setTimeout(() => {
        router.push(`/cs/${id}`)
      }, 100)
    } catch (error) {
      console.error('답변 제출 실패:', error)
      alert('답변 제출에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return {
    answer,
    setAnswer,
    problemDetail,
    isLoading,
    error,
    submitAnswerMutation,
    handleSubmit,
  }
}
