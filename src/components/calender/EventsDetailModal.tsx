 'use client'

import Image from 'next/image'
import CalendarEventCard, { CalendarEventCardProps } from './CalendarEventCard'
import { useState } from 'react'
import AddCalendarModal from './AddCalendarModal'

interface EventsDetailModalProps {
  date: string
  events: CalendarEventCardProps[]
  onClose: () => void
  onEdit: (eventId: number) => void
//   onDelete: (eventId: number) => void
}

export default function EventsDetailModal({
  date,
  events,
  onClose,
  onEdit,
//   onDelete,
}: EventsDetailModalProps) {
  const [editEventId, setEditEventId] = useState<number | null>(null)

  const handleEdit = (eventId: number) => {
    setEditEventId(eventId)
  }

  const handleCloseEdit = () => {
    setEditEventId(null)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 w-[486px] h-[576px]">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{date} 일정</span>
          <button onClick={onClose}>
            <Image src="/XIcon.svg" alt="close" width={14} height={14} />
          </button>
        </div>
        <div className="h-[400px] space-y-4 mt-10">
          {events.length > 0 ? (
            events.map((event) => (
              <CalendarEventCard
                key={event.id}
                {...event}
                mode="modal"
                onEdit={() => handleEdit(event.id!)}
              />
            ))
          ) : (
            <div className='h-full flex items-center justify-center'>
              <span className="text-[#757575]">해당 날짜에는 일정이 없습니다.</span>
            </div>
          )}
        </div>
        {editEventId && (
          <AddCalendarModal
            handleBack={handleCloseEdit}
            mode="edit"
            eventId={editEventId}
          />
        )}
      </div>
    </div>
  )
}