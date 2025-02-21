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
}

export default function SessionMenu({
  id,
  fileUrl,
  showMessage,
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
      console.error(err)
    }
  }
  const clickBookmark = async () => {
    try {
      const data = await fetchBookmarks('SESSION', 0, 50)
      if (data.find((bookmark: any) => bookmark.id === id)) {
        addCancelBookmark(id, 'SESSION', false)
        alert('북마크 취소')
      } else {
        addCancelBookmark(id, 'SESSION', true)
        alert('북마크 추가')
      }
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      showMessage()
    },
    onError: (error) => {
      console.error('세션 데이터 삭제 실패:', error)
    },
  })
  return (
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
  )
}
