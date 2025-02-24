'use client'

import Link from 'next/link'
import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { LiaDownloadSolid } from 'react-icons/lia'
import { useMutation } from '@tanstack/react-query'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import { deleteSession } from '@/app/session/_lib/deleteSession'

interface SessionMenuProps {
  id: string
  fileUrl: string
  showMessage: () => void
  setModalOpen: (open: boolean) => void
  setModalMessage: (message: string) => void
}

export default function SessionMenu({
  id,
  fileUrl,
  showMessage,
  setModalOpen,
  setModalMessage,
}: SessionMenuProps) {
  const { postBookmark, fetchBookmarks } = useBookmark()

  const addCancelBookmark = async (
    id: any,
    category: string,
    bookmarkStatus: boolean,
  ) => {
    try {
      await postBookmark(id, category, bookmarkStatus)
    } catch (err) {
    }
  }

  const clickBookmark = async () => {
    try {
      const data = await fetchBookmarks('SESSION', 0, 50)
      if (data.find((bookmark: any) => bookmark.id === id)) {
        await addCancelBookmark(id, 'SESSION', false)
        setModalMessage('북마크가 취소하였습니다.')
      } else {
        await addCancelBookmark(id, 'SESSION', true)
        setModalMessage('북마크에 저장되었습니다.')
      }
      setModalOpen(true)
      setTimeout(() => setModalOpen(false), 2000)
    } catch (err) {
    }
  }

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      showMessage()
    },
    onError: (error) => {
    },
  })

  return (
    <div className="relative">
      <div className="absolute right-1 top-6 flex flex-col item-center justify-center w-[100px] text-sm h-auto border bg-white border-lightgray rounded-md">
        <button
          type="button"
          onClick={clickBookmark}
          className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        >
          <MdBookmarkBorder className="w-4 h-4" />
          북마크
        </button>
        <Link
          href={`/session/edit/${id}`}
          className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        >
          <TbEdit className="w-4 h-4" />
          수정
        </Link>
        <button
          onClick={() => window.open(fileUrl)}
          className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
        >
          <LiaDownloadSolid className="w-4 h-4" />
          자료
        </button>
        <button
          type="button"
          className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
          onClick={() => mutate(id)}
        >
          <MdDeleteOutline className="w-4 h-4" />
          삭제
        </button>
      </div>
    </div>
  )
}
