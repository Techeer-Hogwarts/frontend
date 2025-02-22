'use client'

import Image from "next/image"

export interface CalendarEventCardProps {
  id?: number
  userId?: number
  category: string
  title: string
  startDate?: string
  endDate?: string
  url: string
  displayDate?: string
  className?: string
  user?: {
    name?: string
    nickname?: string
    profileImage?: string
  }
  mode?: 'calendar' | 'modal'
  onEdit?: () => void
  onDelete?: () => void
}

export default function CalendarEventCard({
  title,
  category,
  displayDate,
  url,
  className = "",
  mode = 'calendar',
  onEdit,
  onDelete
}: CalendarEventCardProps) {
  
  const getCategoryColor = () => {
    switch (category) {
      case 'TECHEER':
        return 'bg-[#0992FA]'
      case 'CONFERENCE':
        return 'bg-[#11D100]'
      case 'JOBINFO':
        return 'bg-[#F27AD0]'
      default:
        return
    }
  }

  const handleClick = () => {
    if (mode === 'modal') {
      window.open(url, '_blank')
    }
  }

  return (
    <div
      className={`flex items-center justify-between ${className}`}
    >
       <button
        type="button"
        className={`flex cursor-pointer ${className}`}
        onClick={handleClick}>
          <div className={`${mode === 'calendar' ? ' w-[9px] h-[9px] mr-[6px] mt-1' : ' w-[16px] h-[16px] mr-[10px] mt-1' } rounded-full ${getCategoryColor()}`} />
          <div className="flex flex-col text-left">
            <span className={`${mode === 'calendar' ? 'text-[12px] w-[95px]' : 'w-[280px]'} text-black truncate`}>
              {title}
            </span>
            {mode === 'calendar' && displayDate && (
              <span className="text-[10px] text-[#969696]">{displayDate}</span>
            )}
          </div>
        </button>
      {mode === 'modal' && (
        <div className="flex gap-3">
          <button onClick={onEdit}>
            <Image src="/pencil.svg" alt="edit" width={15} height={15} />
          </button>
          <button onClick={onDelete}>
            <Image src="/trashbin.svg" alt="delete" width={13} height={15} />
          </button>
        </div>
      )}
    </div>
  )
}
