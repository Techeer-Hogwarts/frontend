'use client'

import { useState } from 'react'
import { useSubmitCsCommentMutation } from '@/api/cs'
import { CsAnswer } from '@/api/cs'

interface UseCommentInputProps {
  answer: CsAnswer
  onCommentSubmitted?: () => void
}

export const useCommentInput = ({
  answer,
  onCommentSubmitted,
}: UseCommentInputProps) => {
  const [replyInput, setReplyInput] = useState('')

  const submitCommentMutation = useSubmitCsCommentMutation()

  const handleReplyInputChange = (value: string) => {
    setReplyInput(value)
  }

  const handleReplySubmit = async () => {
    if (!replyInput.trim()) return

    try {
      await submitCommentMutation.mutateAsync({
        answerId: answer.id,
        data: { content: replyInput.trim() },
      })

      // 성공 시 입력창 초기화
      setReplyInput('')
      onCommentSubmitted?.()
    } catch (error) {
      console.error('댓글 제출 실패:', error)
      alert('댓글 제출에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleReplyCancel = () => {
    setReplyInput('')
  }

  return {
    replyInput,
    submitCommentMutation,
    handleReplyInputChange,
    handleReplySubmit,
    handleReplyCancel,
  }
}
