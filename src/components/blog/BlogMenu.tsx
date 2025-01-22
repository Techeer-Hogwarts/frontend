'use client'

import { MdDeleteOutline } from 'react-icons/md'
import { MdBookmarkBorder } from 'react-icons/md'

interface blogMenuProps {
  id: string
  onDelete: (id: string) => void
}

export default function BlogMenu({ id, onDelete }: blogMenuProps) {
  const blogDelete = async () => {
    try {
      const response = await fetch(
        `https://api.techeerzip.cloud/api/v1/blogs/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('세션 삭제에 실패했습니다.')
      }

      await response.json()
      onDelete(id)
    } catch (error) {
      console.error('세션 삭제 중 오류 발생:', error)
    }
  }

  return (
    <div className="absolute right-1 z-50 top-6 flex flex-col item-center justify-center w-[100px] text-sm h-auto border bg-white border-lightgray rounded-md">
      <button
        type="button"
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
      >
        <MdBookmarkBorder className="w-4 h-4" />
        북마크
      </button>
      <button
        type="button"
        className="flex items-center justify-start gap-1 pl-3 py-1 hover:bg-black/10"
        onClick={blogDelete}
      >
        <MdDeleteOutline className="w-4 h-4" />
        삭제
      </button>
    </div>
  )
}
