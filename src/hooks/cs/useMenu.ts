'use client'

import { useState, useEffect, useRef } from 'react'
import {
  useDeleteCsCommentMutation,
  useDeleteCsAnswerMutation,
} from '@/api/cs/mutations'

interface UseMenuProps {
  id: number
  type: 'comment' | 'answer'
  onEdit: () => void
  problemId?: number // 문제 ID 추가
}

export const useMenu = ({ id, type, onEdit, problemId }: UseMenuProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const deleteCommentMutation = useDeleteCsCommentMutation()
  const deleteAnswerMutation = useDeleteCsAnswerMutation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const handleEdit = () => {
    onEdit()
    setShowMenu(false)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
    setShowMenu(false)
  }

  const handleDeleteConfirm = async () => {
    try {
      if (type === 'comment') {
        await deleteCommentMutation.mutateAsync(id)
      } else {
        // 답변 삭제 시 문제 ID도 함께 전달
        if (problemId) {
          await deleteAnswerMutation.mutateAsync({ answerId: id, problemId })
        } else {
          // 문제 ID가 없는 경우 기존 방식으로 호출 (하위 호환성)
          await deleteAnswerMutation.mutateAsync({ answerId: id, problemId: 0 })
        }
      }
    } catch (error) {
      alert(`${type === 'comment' ? '댓글' : '답변'} 삭제에 실패했습니다.`)
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  return {
    showMenu,
    showDeleteModal,
    menuRef,
    handleMenuToggle,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseDeleteModal,
  }
}
