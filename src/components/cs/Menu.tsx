'use client'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { useMenu } from '@/hooks/cs/useMenu'
import DeleteConfirmModal from './DeleteConfirmModal'

interface CommentMenuProps {
  id: number
  type: 'comment' | 'answer'
  onEdit: () => void
}

export default function CommentMenu({ id, type, onEdit }: CommentMenuProps) {
  const {
    showMenu,
    showDeleteModal,
    menuRef,
    handleMenuToggle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCloseDeleteModal,
  } = useMenu({ id, type, onEdit })

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button onClick={handleMenuToggle} className="p-1">
          <BsThreeDotsVertical className="text-darkgray" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray rounded-lg shadow-lg z-10 min-w-[100px]">
            <button
              onClick={onEdit}
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
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        title={`${type === 'comment' ? '댓글' : '답변'} 삭제`}
        message={`정말로 이 ${type === 'comment' ? '댓글' : '답변'}을 삭제하시겠습니까?`}
      />
    </>
  )
}
