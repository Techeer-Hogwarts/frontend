'use client'

import { MdDeleteOutline } from 'react-icons/md'

interface ResumeMenuProps {
  resumeId: string
}

export default function ResumeMenu({ resumeId }: ResumeMenuProps) {
  const ResumeDelete = async () => {
    // e.preventDefault() // 페이지 이동 방지
    try {
      const response = await fetch(`/api/v1/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('이력서 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('이력서 삭제 중 오류 발생:', error)
    }
  }

  return (
    <div className="absolute -right-6 z-50 top-7 flex flex-col item-center justify-center w-[5rem] text-sm h-auto border bg-white border-lightgray rounded-md">
      <button
        type="button"
        className="flex items-center justify-start gap-1 py-1 pl-3 hover:bg-lightprimary hover:text-primary hover:border-primary"
        onClick={ResumeDelete}
      >
        <MdDeleteOutline className="w-4 h-4" />
        삭제
      </button>
    </div>
  )
}
