'use client'

import { useState } from 'react'
import { useCsCommentListQuery, useUpdateCsCommentMutation } from '@/api/cs'
import { CsAnswer, CsComment } from '@/api/cs'
import { useAuthStore } from '@/store/authStore'
import { useLoadMore } from './useLoadMore'
import { useAutoResizeTextarea } from '@/hooks/cs/useAutoResizeTextarea'

interface UseCommentListProps {
  answer: CsAnswer
}

export const useCommentList = ({ answer }: UseCommentListProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')
  const { user } = useAuthStore()

  // 자동 높이 조절 훅 사용 (편집 중일 때만 활성화)
  const editTextareaRef = useAutoResizeTextarea(editContent, !!editingCommentId)

  const {
    data: commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsCommentListQuery(answer.id, {
    size: 3,
  })

  const updateCommentMutation = useUpdateCsCommentMutation()

  const { handleLoadMore } = useLoadMore({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

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

  const hasChanges = (comment: CsComment) => {
    return editContent.trim() !== comment.content.trim()
  }

  const isEmpty = editContent.trim() === ''

  const allComments =
    commentListData?.pages.flatMap((page) => page.comments) || []

  const isMyComment = (comment: CsComment) => {
    return (
      user?.name === comment.user.name &&
      user?.profileImage === comment.user.profileImage
    )
  }

  return {
    editingCommentId,
    editContent,
    setEditContent,
    editTextareaRef,
    commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    updateCommentMutation,
    allComments,
    handleLoadMore,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    hasChanges,
    isEmpty,
    isMyComment,
  }
}
