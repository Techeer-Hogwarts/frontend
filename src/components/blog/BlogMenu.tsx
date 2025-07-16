'use client'

import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import { useDeleteBlogAPI } from '@/api/blog/blog'

interface BlogMenuProps {
  id: string
  onDelete: (id: string) => void
  setModalOpen: (open: boolean) => void
  setModalMessage: (message: string) => void
  setShowMenu: (show: boolean) => void
}

interface BookmarkProps {
  id: string
}

export default function BlogMenu({
  id,
  onDelete,
  setModalOpen,
  setModalMessage,
  setShowMenu,
}: BlogMenuProps) {
  const deleteBlogMutation = useDeleteBlogAPI()

  const handleDeleteBlog = async () => {
    if (window.confirm('정말로 이 블로그를 삭제하시겠습니까?')) {
      try {
        await deleteBlogMutation.mutateAsync(id)
        setModalMessage('블로그가 삭제되었습니다.')
        setModalOpen(true)
        setTimeout(() => setModalOpen(false), 2000)
        onDelete(id)
        setShowMenu(false)
      } catch (error) {
        console.error('블로그 삭제 중 오류 발생:', error)
        setModalMessage('블로그 삭제에 실패했습니다.')
        setModalOpen(true)
        setTimeout(() => setModalOpen(false), 2000)
        setShowMenu(false)
      }
    }
  }

  const { postBookmark, fetchBookmarks } = useBookmark()
  const addCancelBookmark = async (
    id: any,
    category: string,
    bookmarkStatus: boolean,
  ) => {
    try {
      await postBookmark(id, category, bookmarkStatus)
    } catch (err) {
      console.error(err)
    }
  }
  const clickBookmark = async () => {
    try {
      const data = await fetchBookmarks('BLOG', 0, 50)
      if (data.find((bookmark: BookmarkProps) => bookmark.id === id)) {
        await addCancelBookmark(id, 'BLOG', false)
        setModalMessage('북마크를 취소하였습니다.')
      } else {
        await addCancelBookmark(id, 'BLOG', true)
        setModalMessage('북마크에 저장되었습니다.')
      }
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2000)
      setShowMenu(false)
    } catch (err) {
      setModalMessage('오류가 발생했습니다.')
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2000)
      setShowMenu(false)
    }
  }

  return (
    <div className="absolute right-1 z-50 top-6 flex flex-col item-center justify-center w-[100px] text-sm h-auto border bg-white border-lightgray rounded-md">
      <button
        type="button"
        className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        onClick={(e) => {
          e.stopPropagation()
          clickBookmark()
        }}
      >
        <MdBookmarkBorder className="w-4 h-4" />
        북마크
      </button>
      <button
        type="button"
        className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteBlog()
        }}
      >
        <MdDeleteOutline className="w-4 h-4" />
        삭제
      </button>
    </div>
  )
}
