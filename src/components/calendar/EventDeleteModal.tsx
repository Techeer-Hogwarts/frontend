'use client'

import { useDeleteEvent } from '@/api/calendar/mutations'

interface EventDeleteModalProps {
  eventId: number
  title: string
  onClose: () => void
}

export default function EventDeleteModal({
  eventId,
  title,
  onClose,
}: EventDeleteModalProps) {
  const { mutate: deleteEvent } = useDeleteEvent()

  const handleDelete = () => {
    deleteEvent(eventId, {
      onSuccess: () => {
        onClose()
      },
      onError: (error) => {},
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-7 w-[400px]">
        <h2 className="text-xl font-bold mb-4">일정 삭제</h2>
        <p className="text-sm mb-5">
          정말로 &#39;{title}&#39; 일정을 삭제하시겠습니까?
        </p>
        <div className="flex justify-end gap-[6px]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-lightgray/50 rounded-md"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-primary text-white rounded-md"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
