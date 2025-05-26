'use client'

import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { LiaDownloadSolid } from 'react-icons/lia'
import { useMutation } from '@tanstack/react-query'
import { deleteSession } from '@/api/session/session'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import { fetchUserProfile } from '@/api/mypage/myprofile'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SessionMenuProps {
  id: string
  fileUrl: string
  userId: string
  showMessage: () => void
  setModalOpen: (open: boolean) => void
  setModalMessage: (message: string) => void
  setShowModal: (show: boolean) => void
}

export default function SessionMenu({
  id,
  fileUrl,
  userId,
  showMessage,
  setModalOpen,
  setModalMessage,
  setShowModal,
}: SessionMenuProps) {
  const router = useRouter()
  const { postBookmark, fetchBookmarks } = useBookmark()
  const [isUserMe, setIsUserMe] = useState(false)
  const clickBookmark = async () => {
    const data = await fetchBookmarks('SESSION', 0, 50)
    if (data.find((bookmark: any) => bookmark.id === id)) {
      await postBookmark(Number(id), 'SESSION', false)
      setModalMessage('북마크가 취소하였습니다.')
    } else {
      await postBookmark(Number(id), 'SESSION', true)
      setModalMessage('북마크에 저장되었습니다.')
    }
    setModalOpen(true)
    setTimeout(() => setModalOpen(false), 2000)
  }
  const clickEdit = () => {
    setShowModal(false)
    router.push(`/session/edit/${id}`)
  }
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      console.log('삭제 성공')
      showMessage()
    },
  })
  useEffect(() => {
    fetchUserProfile().then((user) => {
      if (user.id === userId) {
        setIsUserMe(true)
      }
    })
  }, [])

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
        {isUserMe && (
          <button
            onClick={clickEdit}
            className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-black/10"
          >
            <TbEdit className="w-4 h-4" />
            수정
          </button>
        )}

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
