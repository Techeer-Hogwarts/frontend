'use client'

import { FaChevronRight } from 'react-icons/fa'
import { CsAnswer } from '@/api/cs'
import { useCommentList } from '@/hooks/cs/useCommentList'
import Menu from './Menu'

interface CommentListProps {
  answer: CsAnswer
}

export default function CommentList({ answer }: CommentListProps) {
  const {
    editingCommentId,
    editContent,
    setEditContent,
    editTextareaRef,
    allComments,
    hasNextPage,
    isFetchingNextPage,
    updateCommentMutation,
    handleLoadMore,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    hasChanges,
    isEmpty,
    isMyComment,
  } = useCommentList({ answer })

  const fallbackProfile = '/profile.png'

  return (
    <div className="space-y-3">
      {/* 댓글 목록 */}
      {allComments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <img
            src={comment.user.profileImage || fallbackProfile}
            alt="avatar"
            className="rounded-full w-8 h-8 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.user.name}</span>
                <span className="text-sm text-gray">
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {isMyComment(comment) && (
                <Menu
                  id={comment.id}
                  type="comment"
                  onEdit={() => handleEdit(comment)}
                />
              )}
            </div>
            {editingCommentId === comment.id ? (
              <div className="mb-2">
                <textarea
                  ref={editTextareaRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full min-h-[3rem] p-2 border border-gray rounded-lg resize-none focus:outline-none focus:border-primary overflow-hidden"
                  placeholder="댓글을 입력하세요..."
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 rounded-full hover:bg-gray"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className={`px-3 py-1 rounded-full ${
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
              <p>{comment.content}</p>
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
            className="text-sm text-primary hover:text-darkPrimary flex items-center gap-1 disabled:opacity-50"
          >
            <FaChevronRight className="text-sm" />
            {isFetchingNextPage ? '로딩 중...' : '답글 더보기'}
          </button>
        </div>
      )}
    </div>
  )
}
