'use client'

import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { useBookmark } from '@/app/blog/_lib/useBookmark'

interface blogMenuProps {
  id: string
  onDelete: (id: string) => void
  setModalOpen: (open: boolean) => void
  setModalMessage: (message: string) => void
}

export default function BlogMenu({
  id,
  onDelete,
  setModalOpen,
  setModalMessage,
}: blogMenuProps) {
  // const blogDelete = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.techeerzip.cloud/api/v1/blogs/${id}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     if (!response.ok) {
  //       throw new Error('세션 삭제에 실패했습니다.')
  //     }

  //     await response.json()
  //     onDelete(id)
  //   } catch (error) {
  //     console.error('세션 삭제 중 오류 발생:', error)
  //   }
  // }
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
      if (data.find((bookmark: any) => bookmark.id === id)) {
        await addCancelBookmark(id, 'BLOG', false)
        setModalMessage('북마크에 취소하였습니다.')
      } else {
        await addCancelBookmark(id, 'BLOG', true)
        setModalMessage('북마크에 저장되었습니다.')
      }
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="absolute right-1 z-50 top-6 flex flex-col item-center justify-center w-[100px] text-sm h-auto border bg-white border-lightgray rounded-md">
      <button
        type="button"
        className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        onClick={clickBookmark}
      >
        <MdBookmarkBorder className="w-4 h-4" />
        북마크
      </button>
      {/* <button
        type="button"
        className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        onClick={blogDelete}
      >
        <MdDeleteOutline className="w-4 h-4" />
        삭제
      </button> */}
    </div>
  )
}
