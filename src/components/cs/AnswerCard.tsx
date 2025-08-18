'use client'

import { useState } from 'react'
import { FaRegThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { CsAnswer } from '@/api/cs'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

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
  const [isExpanded, setIsExpanded] = useState(false)

  const handleReplyToggle = () => {
    setShowReplies(!showReplies)
  }

  const handleReplyInputToggle = () => {
    setShowReplyInput(!showReplyInput)
  }

  const handleExpandAnswer = () => {
    setIsExpanded(!isExpanded)
  }

  const handleCommentSubmitted = () => {
    // 댓글 제출 성공 시 입력창 닫기
    setShowReplyInput(false)
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
            <div className="border border-primary bg-filterbg rounded-xl text-sm font-semibold text-primary w-12 h-12 flex items-center justify-center">
              {answer.score}
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

      {/* 댓글 목록 */}
      {showReplies && (
        <div className="mt-4 ml-11">
          <CommentList answer={answer} />
        </div>
      )}
    </div>
  )
}
