'use client'

import { useState } from 'react'
import { useUpdateCsAnswerMutation } from '@/api/cs/mutations'
import { CsAnswer } from '@/api/cs'

interface UseAnswerCardProps {
  answer: CsAnswer
}

export const useAnswerCard = ({ answer }: UseAnswerCardProps) => {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(answer.content)
  const [displayContent, setDisplayContent] = useState(answer.content)

  const updateAnswerMutation = useUpdateCsAnswerMutation()

  const handleReplyToggle = () => {
    setShowReplies(!showReplies)
  }

  const handleReplyInputToggle = () => {
    setShowReplyInput(!showReplyInput)
  }

  const handleFeedbackToggle = () => {
    setShowFeedback(!showFeedback)
  }

  const handleExpandAnswer = () => {
    setIsExpanded(!isExpanded)
  }

  const handleCommentSubmitted = () => {
    setShowReplyInput(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(answer.content)
  }

  const handleSaveEdit = async () => {
    try {
      await updateAnswerMutation.mutateAsync({
        answerId: answer.id,
        data: { content: editContent },
      })
      setIsEditing(false)
      setDisplayContent(editContent)
    } catch (error) {
      console.error('답변 수정 실패:', error)
      alert('답변 수정에 실패했습니다.')
    }
  }

  const handleCancelEdit = () => {
    setEditContent(answer.content)
    setIsEditing(false)
  }

  const hasChanges = editContent.trim() !== answer.content.trim()
  const isEmpty = editContent.trim() === ''

  const shouldShowExpandButton = (content: string) => {
    return content.length > 200
  }

  return {
    showReplies,
    showReplyInput,
    showFeedback,
    isExpanded,
    isEditing,
    editContent,
    setEditContent,
    displayContent,
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
    shouldShowExpandButton,
  }
}
