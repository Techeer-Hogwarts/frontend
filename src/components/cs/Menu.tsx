'use client'

import { useState, useEffect, useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  useDeleteCsCommentMutation,
  useDeleteCsAnswerMutation,
} from '@/api/cs/mutations'
import DeleteConfirmModal from './DeleteConfirmModal'

interface CommentMenuProps {
  id: number
  type: 'comment' | 'answer'
  onEdit: () => void
}

export default function CommentMenu({ id, type, onEdit }: CommentMenuProps) {
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

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button onClick={handleMenuToggle} className="p-1">
          <BsThreeDotsVertical className="text-darkgray" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray rounded-lg shadow-lg z-10 min-w-[100px]">
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-left text-sm hover:bg-filterbg rounded-t-lg"
            >
              수정
            </button>
            <button
              onClick={handleDeleteClick}
              className="w-full px-3 py-2 text-left text-sm hover:bg-filterbg text-red-600 rounded-b-lg"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title={`${type === 'comment' ? '댓글' : '답변'} 삭제`}
        message={`정말로 이 ${type === 'comment' ? '댓글' : '답변'}을 삭제하시겠습니까?`}
      />
    </>
  )
}
