'use client'

import { CsAnswer } from '@/api/cs'
import { useCommentInput } from '@/hooks/cs/useCommentInput'

interface CommentInputProps {
  answer: CsAnswer
  onCommentSubmitted?: () => void
}

export default function CommentInput({
  answer,
  onCommentSubmitted,
}: CommentInputProps) {
  const {
    replyInput,
    textareaRef,
    submitCommentMutation,
    handleReplyInputChange,
    handleReplySubmit,
    handleReplyCancel,
  } = useCommentInput({ answer, onCommentSubmitted })

  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          placeholder="답글을 작성해주세요"
          className="w-full min-h-[4rem] border border-gray rounded-xl p-3 resize-none focus:outline-none focus:border-primary overflow-hidden"
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
