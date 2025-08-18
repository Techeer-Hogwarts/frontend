'use client'

import { useCsCommentListQuery } from '@/api/cs'
import { CsAnswer } from '@/api/cs'
import { FaChevronRight } from 'react-icons/fa'

interface CommentListProps {
  answer: CsAnswer
}

export default function CommentList({ answer }: CommentListProps) {
  const {
    data: commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsCommentListQuery(answer.id, {
    size: 3,
  })

  const handleLoadMore = () => {
    fetchNextPage()
  }

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
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{comment.user.name}</span>
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
            <p className="text-sm">{comment.content}</p>
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
