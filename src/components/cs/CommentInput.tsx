'use client'

import { useState } from 'react'
import { useSubmitCsCommentMutation } from '@/api/cs'
import { CsAnswer } from '@/api/cs'

interface CommentInputProps {
  answer: CsAnswer
  onCommentSubmitted?: () => void
}

export default function CommentInput({
  answer,
  onCommentSubmitted,
}: CommentInputProps) {
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

  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="flex-1">
        <textarea
          placeholder="답글을 작성해주세요"
          className="w-full h-16 border border-gray rounded-xl p-3 resize-none focus:outline-none focus:border-primary"
          value={replyInput}
          onChange={(e) => handleReplyInputChange(e.target.value)}
          disabled={submitCommentMutation.isPending}
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={handleReplyCancel}
            disabled={submitCommentMutation.isPending}
            className="px-3 py-1 rounded-full text-darkgray hover:bg-lightgray disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleReplySubmit}
            disabled={!replyInput.trim() || submitCommentMutation.isPending}
            className={`px-3 py-1 rounded-full ${
              replyInput.trim() && !submitCommentMutation.isPending
                ? 'bg-primary text-white hover:bg-darkPrimary'
                : 'bg-gray text-darkgray'
            }`}
          >
            {submitCommentMutation.isPending ? '제출 중...' : '답글'}
          </button>
        </div>
      </div>
    </div>
  )
}
