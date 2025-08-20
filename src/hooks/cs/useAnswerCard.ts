'use client'

import { useState, useEffect, useRef } from 'react'
import { useUpdateCsAnswerMutation } from '@/api/cs/mutations'
import { CsAnswer } from '@/api/cs'
import { useAutoResizeTextarea } from '@/hooks/cs/useAutoResizeTextarea'

interface UseAnswerCardProps {
  answer: CsAnswer
  onRefresh?: () => void // 새로고침 콜백 추가
  problemId?: number // 문제 ID 추가
}

export const useAnswerCard = ({
  answer,
  onRefresh,
  problemId,
}: UseAnswerCardProps) => {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(answer.content)
  const [displayContent, setDisplayContent] = useState(answer.content)

  const updateAnswerMutation = useUpdateCsAnswerMutation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 자동 높이 조절 훅 사용 (편집 모드일 때만 활성화)
  const editTextareaRef = useAutoResizeTextarea(editContent, isEditing)

  // AI 피드백이 null일 때 1분마다 자동 새로고침
  useEffect(() => {
    // AI 피드백이 null이고 피드백을 보여주는 상태일 때만 자동 새로고침
    if ((answer.score === null || answer.feedback === null) && onRefresh) {
      intervalRef.current = setInterval(() => {
        onRefresh()
      }, 60000) // 1분 후에 새로고침

      // 컴포넌트 언마운트 시 인터벌 정리
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    } else {
      // AI 피드백이 있는 상태면 인터벌 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [answer.score, answer.feedback, onRefresh])

  // 컴포넌트 언마운트 시 인터벌 정리 (페이지를 벗어날 때)
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

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
    editTextareaRef,
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
