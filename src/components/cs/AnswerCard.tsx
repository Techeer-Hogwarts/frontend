'use client'

import { FaRegThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { CsAnswer } from '@/api/cs'
import { useAnswerCard } from '@/hooks/cs/useAnswerCard'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Menu from './Menu'

interface AnswerCardProps {
  answer: CsAnswer
  isMyAnswer?: boolean
  problemId?: number
  onRefresh?: () => void // 새로고침 콜백 추가
}

export default function AnswerCard({
  answer,
  isMyAnswer = false,
  problemId,
  onRefresh,
}: AnswerCardProps) {
  const {
    showReplies,
    showReplyInput,
    showFeedback,
    isExpanded,
    isEditing,
    editContent,
    setEditContent,
    displayContent,
    editTextareaRef,
    contentRef,
    shouldShowExpandButton,
    updateAnswerMutation,
    handleReplyToggle,
    handleReplyInputToggle,
    handleFeedbackToggle,
    handleExpandAnswer,
    handleCommentSubmitted,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    hasChanges,
    isEmpty,
  } = useAnswerCard({ answer, onRefresh, problemId })

  const fallbackProfile = '/profile.png'

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={answer.user.profileImage || fallbackProfile}
          alt="avatar"
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{answer.user.name}</p>
              <span className="text-sm text-gray">
                {new Date(answer.updateAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {isMyAnswer && (
              <Menu
                id={answer.id}
                type="answer"
                onEdit={handleEdit}
                problemId={problemId}
              />
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              {isEditing ? (
                <div className="mb-4">
                  <textarea
                    ref={editTextareaRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full min-h-[5rem] border border-gray rounded-xl p-3 resize-none focus:outline-none focus:border-primary overflow-hidden"
                    placeholder="답변을 입력하세요..."
                  />
                  <div className="flex justify-end gap-2 mt-1">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 rounded-full text-darkgray hover:bg-lightgray disabled:opacity-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className={`px-3 py-1 rounded-full ${
                        !updateAnswerMutation.isPending &&
                        hasChanges &&
                        !isEmpty
                          ? 'bg-primary text-white hover:bg-darkPrimary'
                          : 'bg-gray text-darkgray'
                      }`}
                      disabled={
                        updateAnswerMutation.isPending || !hasChanges || isEmpty
                      }
                    >
                      {updateAnswerMutation.isPending ? '저장 중...' : '저장'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-2">
                  <p
                    ref={contentRef}
                    className={`leading-relaxed whitespace-pre-wrap ${
                      !isExpanded && shouldShowExpandButton
                        ? 'line-clamp-3'
                        : ''
                    }`}
                  >
                    {displayContent}
                  </p>
                  {shouldShowExpandButton && (
                    <button
                      onClick={handleExpandAnswer}
                      className="text-gray text-sm mt-2 hover:underline"
                    >
                      {isExpanded ? '접기' : '자세히 보기'}
                    </button>
                  )}
                </div>
              )}
              <div className="flex gap-2 items-center text-sm">
                {/* <button className="flex items-center gap-1 hover:text-primary">
                  <FaRegThumbsUp className="text-sm" /> {answer.likeCount}
                </button> */}
                <button
                  onClick={handleReplyInputToggle}
                  className="px-2 py-1 rounded-full hover:bg-lightgray"
                >
                  답글
                </button>
                <button
                  onClick={handleFeedbackToggle}
                  className="text-primary flex items-center gap-1 px-2 py-1 rounded-full hover:bg-lightprimary"
                >
                  AI 피드백
                  {showFeedback ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {answer.commentCount > 0 && (
                  <button
                    onClick={handleReplyToggle}
                    className="text-primary flex items-center gap-1 px-2 py-1 rounded-full hover:bg-lightprimary"
                  >
                    답글 {answer.commentCount}개
                    {showReplies ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 입력 영역 */}
      {showReplyInput && (
        <div className="mt-4 ml-11">
          <CommentInput
            answer={answer}
            onCommentSubmitted={handleCommentSubmitted}
          />
        </div>
      )}

      {/* AI 피드백 섹션 */}
      {showFeedback && (
        <div className="mt-4 ml-11">
          <div className="bg-filterbg border border-gray rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">AI 피드백</span>
            </div>
            {answer.score !== null && answer.feedback !== null ? (
              <div className="flex gap-2 items-center">
                <div className="border border-primary bg-white rounded-xl font-semibold text-primary w-12 h-10 flex items-center justify-center">
                  {answer.score}
                </div>
                <p className="w-full text-darkgray">{answer.feedback}</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="border border-primary bg-white rounded-xl font-semibold text-primary w-12 h-10 flex items-center justify-center">
                  -
                </div>
                <p className="w-full text-darkgray">
                  AI가 답변을 분석하고 있습니다. 잠시만 기다려주세요...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 댓글 목록 */}
      {showReplies && (
        <div className="mt-4 ml-11">
          <CommentList answer={answer} />
        </div>
      )}
    </div>
  )
}
