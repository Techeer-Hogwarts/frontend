'use client'

export interface CalendarEventCardProps {
  id?: number
  userId?: number
  category: string
  title: string
  startDate: string
  endDate: string
  url: string
  displayDate?: string
  className?: string
  user?: {
    name?: string
    nickname?: string
    profileImage?: string
  }
}

export default function CalendarEventCard({ title, startDate, endDate, category, url, className=""}: CalendarEventCardProps) {
  
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
    window.open(url, '_blank')
  }

  return (
    <div
    role="button"
    className={`flex cursor-pointer ${className}`}
    onClick={handleClick}>
      <div className={`rounded-full w-[9px] h-[9px] mr-2 mt-1 ${getCategoryColor()}`} />
      <div className="flex flex-col">
        <span className="text-[12px] text-black w-[95px] truncate">{title}</span>
        <span className="text-[10px] text-[#969696]">
          {`${String(new Date(startDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(startDate).getDate()).padStart(2, '0')} - 
          ${String(new Date(endDate).getMonth() + 1).padStart(2, '0')}.${String(new Date(endDate).getDate()).padStart(2, '0')}`}
        </span>
      </div>
    </div>
  )
}
