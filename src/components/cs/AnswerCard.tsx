'use client'

import { useState } from 'react'
import { FaRegThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useSubmitCsCommentMutation } from '@/api/cs'
import { CsAnswer } from '@/api/cs'

interface AnswerCardProps {
  answer: CsAnswer
  isMyAnswer?: boolean
}

export default function AnswerCard({
  answer,
  isMyAnswer = false,
}: AnswerCardProps) {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyInput, setReplyInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const submitCommentMutation = useSubmitCsCommentMutation()

  const handleReplyToggle = () => {
    setShowReplies(!showReplies)
  }

  const handleReplyInputToggle = () => {
    setShowReplyInput(!showReplyInput)
    if (!showReplyInput) {
      setReplyInput('')
    }
  }

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

      // 성공 시 입력창 초기화 및 닫기
      setReplyInput('')
      setShowReplyInput(false)
    } catch (error) {
      console.error('댓글 제출 실패:', error)
      alert('댓글 제출에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleReplyCancel = () => {
    setReplyInput('')
    setShowReplyInput(false)
  }

  const handleExpandAnswer = () => {
    setIsExpanded(!isExpanded)
  }

  const shouldShowExpandButton = (content: string) => {
    return content.length > 200
  }

  return (
    <div className=" mb-6">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={answer.user.profileImage || 'https://i.pravatar.cc/40?u=user'}
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold">{answer.user.name}</p>
            <span className="text-xs text-gray">
              {new Date(answer.updateAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="mb-2">
                <p
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    !isExpanded && shouldShowExpandButton(answer.content)
                      ? 'line-clamp-2'
                      : ''
                  }`}
                >
                  {answer.content}
                </p>
                {shouldShowExpandButton(answer.content) && (
                  <button
                    onClick={handleExpandAnswer}
                    className="text-gray text-sm mt-2 hover:underline"
                  >
                    {isExpanded ? '접기' : '자세히 보기'}
                  </button>
                )}
              </div>
              <div className="flex gap-4 items-center text-sm">
                {/* <button className="flex items-center gap-1 hover:text-primary">
                  <FaRegThumbsUp className="text-sm" /> {answer.likeCount}
                </button> */}
                <button
                  onClick={handleReplyInputToggle}
                  className="px-2 py-1 rounded-full hover:bg-lightgray"
                >
                  답글
                </button>
                {answer.commentCount > 0 && (
                  <button
                    onClick={handleReplyToggle}
                    className="text-primary  flex items-center gap-1"
                  >
                    답글 {answer.commentCount}개
                    {showReplies ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </div>
            </div>
            <div className="border border-primary bg-filterbg rounded-xl text-sm font-semibold text-primary w-12 h-12 flex items-center justify-center">
              {answer.score}
            </div>
          </div>
        </div>
      </div>

      {/* 답글 입력 영역 */}
      {showReplyInput && (
        <div className="flex items-start gap-3 mt-4 text-sm">
          <div className="w-8 h-8"></div>
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
      )}

      {/* 답글 목록 */}
      {showReplies && answer.commentCount > 0 && (
        <div className="mt-4 space-y-3">
          {/* 임시 답글 데이터 - 실제로는 API에서 가져와야 함 */}
          {[1, 2, 3]
            .slice(0, Math.min(3, answer.commentCount))
            .map((commentId) => (
              <div key={commentId} className="flex items-start gap-3">
                <div className="w-8 h-8"></div>
                <img
                  src="https://i.pravatar.cc/40?u=comment"
                  alt="avatar"
                  className="rounded-full w-8 h-8"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      사용자{commentId}
                    </span>
                    <span className="text-xs text-gray">
                      2025년 4월 13일 10:31
                    </span>
                  </div>
                  <p className="text-sm">답글 내용 {commentId}입니다.</p>
                </div>
              </div>
            ))}
          {answer.commentCount > 3 && (
            <button className="text-xs text-gray-500 hover:text-primary flex items-center gap-1">
              답글 더보기
            </button>
          )}
        </div>
      )}
    </div>
  )
}
