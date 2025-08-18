'use client'

import { useState } from 'react'
import { useCsCommentListQuery, useUpdateCsCommentMutation } from '@/api/cs'
import { CsAnswer, CsComment } from '@/api/cs'
import { FaChevronRight } from 'react-icons/fa'
import CommentMenu from './CommentMenu'

interface CommentListProps {
  answer: CsAnswer
}

export default function CommentList({ answer }: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  const {
    data: commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsCommentListQuery(answer.id, {
    size: 3,
  })

  const updateCommentMutation = useUpdateCsCommentMutation()

  const handleLoadMore = () => {
    fetchNextPage()
  }

  const handleEdit = (comment: CsComment) => {
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  const handleSaveEdit = async () => {
    if (!editingCommentId) return

    try {
      await updateCommentMutation.mutateAsync({
        commentId: editingCommentId,
        data: { content: editContent },
      })
      setEditingCommentId(null)
      setEditContent('')
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditContent('')
  }

  // 수정 내용이 원본과 같은지 확인
  const hasChanges = (comment: CsComment) => {
    return editContent.trim() !== comment.content.trim()
  }

  const isEmpty = editContent.trim() === ''

  // 모든 댓글을 하나의 배열로 합치기
  const allComments =
    commentListData?.pages.flatMap((page) => page.comments) || []

  const fallbackProfile = '/profile.png'

  return (
    <div className="space-y-3">
      {/* 댓글 목록 */}
      {allComments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <img
            src={comment.user.profileImage || fallbackProfile}
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {comment.user.name}
                </span>
                <span className="text-xs text-gray">
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <CommentMenu
                commentId={comment.id}
                onEdit={() => handleEdit(comment)}
              />
            </div>
            {editingCommentId === comment.id ? (
              <div className="mb-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray rounded-lg resize-none text-sm"
                  rows={2}
                  placeholder="댓글을 입력하세요..."
                />
                <div className="flex justify-end gap-1 mt-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 rounded-full text-xs hover:bg-gray"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className={`px-3 py-1 rounded-full text-xs ${
                      !updateCommentMutation.isPending &&
                      hasChanges(comment) &&
                      !isEmpty
                        ? 'bg-primary text-white hover:bg-darkPrimary'
                        : 'bg-gray text-darkgray'
                    }`}
                    disabled={
                      updateCommentMutation.isPending ||
                      !hasChanges(comment) ||
                      isEmpty
                    }
                  >
                    {updateCommentMutation.isPending ? '저장 중...' : '저장'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm">{comment.content}</p>
            )}
          </div>
        </div>
      ))}

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className="flex items-center gap-1">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="text-xs text-primary hover:text-darkPrimary flex items-center gap-1 disabled:opacity-50"
          >
            <FaChevronRight className="text-sm" />
            {isFetchingNextPage ? '로딩 중...' : '답글 더보기'}
          </button>
        </div>
      )}
    </div>
  )
}
