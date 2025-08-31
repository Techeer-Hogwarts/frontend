'use client'

import { useState } from 'react'
import { useCsProblemDetailQuery, useSubmitCsAnswerMutation } from '@/api/cs'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { csKeys } from '@/api/cs/keys'

interface UseCsDetailBoxProps {
  id: string
}

export const useCsDetailBox = ({ id }: UseCsDetailBoxProps) => {
  const [answer, setAnswer] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

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

      // 캐시 무효화가 완료될 때까지 잠시 대기 후 페이지 이동
      setTimeout(async () => {
        // 답변 목록 쿼리를 강제로 다시 가져오기
        await queryClient.invalidateQueries({
          queryKey: csKeys.answerList(Number(id), {
            size: 10,
            sortBy: 'UPDATE_AT_DESC',
          }),
        })
        router.push(`/cs/${id}`)
      }, 500) // 500ms로 증가
    } catch (error) {
      console.error('답변 제출 실패:', error)
      // 에러 메시지를 alert에 표시
      const errorMessage =
        error instanceof Error
          ? error.message
          : '답변 제출에 실패했습니다. 다시 시도해주세요.'
      alert(errorMessage)
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
