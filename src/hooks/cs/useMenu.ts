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
}

export const useMenu = ({ id, type, onEdit }: UseMenuProps) => {
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
        await deleteAnswerMutation.mutateAsync(id)
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
