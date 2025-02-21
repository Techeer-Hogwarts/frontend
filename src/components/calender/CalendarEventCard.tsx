'use client'

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
}

export default function CalendarEventCard({ title, category, displayDate, url, className=""}: CalendarEventCardProps) {
  
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
    <button
    type="button"
    className={`flex cursor-pointer ${className}`}
    onClick={handleClick}>
      <div className={`rounded-full w-[9px] h-[9px] mr-[6px] mt-1 ${getCategoryColor()}`} />
      <div className="flex flex-col text-left">
        <span className="text-[12px] text-black w-[95px] truncate">{title}</span>
        <span className="text-[10px] text-[#969696]">{displayDate}</span>
      </div>
    </button>
  )
}
