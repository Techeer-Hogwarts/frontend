'use client'

import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDeleteCsCommentMutation } from '@/api/cs/mutations'
import DeleteConfirmModal from './DeleteConfirmModal'

interface CommentMenuProps {
  commentId: number
  onEdit: () => void
}

export default function CommentMenu({ commentId, onEdit }: CommentMenuProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteCommentMutation = useDeleteCsCommentMutation()

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
      await deleteCommentMutation.mutateAsync(commentId)
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      alert('댓글 삭제에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="relative">
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
        title="댓글 삭제"
        message="정말로 이 댓글을 삭제하시겠습니까?"
      />
    </>
  )
}
