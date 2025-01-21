'use client'

import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'
import { LiaDownloadSolid } from 'react-icons/lia'
import { deleteSession } from '@/app/session/_lib/deleteSession'
import { useMutation } from '@tanstack/react-query'
interface SessionMenuProps {
  id: string
  onDelete: (id: string) => void
  title: string
  date: string
  presenter: string
  thumbnail: string
  videoUrl: string
  fileUrl: string
}

export default function SessionMenu({
  id,
  onDelete,
  fileUrl,
  title,
  date,
  presenter,
  thumbnail,
  videoUrl,
}: SessionMenuProps) {
  const { mutateAsync } = useMutation({ mutationFn: deleteSession })
  const fetchDeleteSession = async () => {
    try {
      await mutateAsync(id)
      onDelete(id)
    } catch (err) {
      console.error('세션 데이터 삭제 실패:', err)
    }
  }
  const goToEditPage = () => {
    const sessionValuses = {
      title: title,
      date: date,
      presenter: presenter,
      thumbnail: thumbnail,
      videoUrl: videoUrl,
      fileUrl: fileUrl,
    }
    sessionStorage.setItem('sessionValuses', JSON.stringify(sessionValuses))
    window.location.href = `/session/edit/${id}`
  }
  // window.location.href = `/session/edit/${id}`

  const handleDownload = () => {
    window.open(fileUrl)
  }
  return (
    <div className="absolute right-1 top-6 flex flex-col item-center justify-center w-[100px] text-sm h-auto border bg-white border-lightgray rounded-md">
      <button
        type="button"
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
      >
        <MdBookmarkBorder className="w-4 h-4" />
        북마크
      </button>
      <button
        type="button"
        onClick={goToEditPage}
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
      >
        <TbEdit className="w-4 h-4" />
        수정
      </button>
      <button
        onClick={handleDownload}
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
      >
        <LiaDownloadSolid className="w-4 h-4" />
        자료
      </button>
      <button
        type="button"
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
        onClick={fetchDeleteSession}
      >
        <MdDeleteOutline className="w-4 h-4" />
        삭제
      </button>
    </div>
  )
}
