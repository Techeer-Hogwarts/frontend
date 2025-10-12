'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import CalendarEventCard, { CalendarEventCardProps } from './CalendarEventCard'
import { useGetEvents } from '@/api/calendar/queries'
import EventsDetailModal from './EventsDetailModal'
import BookmarkModal from '../common/BookmarkModal'

interface CalendarProps {
  selectedCategories: string[]
  currentUserId: number | null
}

export default function Calendar({
  selectedCategories,
  currentUserId,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const startOfMonth = currentDate.startOf('month').day()
  const daysInMonth = currentDate.daysInMonth()
  const currentMonth = currentDate.month() + 1 // month는 0부터 시작하므로 1을 더함
  const today = dayjs()

  const { data: events } = useGetEvents({
    category: selectedCategories.length > 0 ? selectedCategories : undefined,
  })

  const expandEvents = (eventsData: CalendarEventCardProps[]) => {
    const expanded: CalendarEventCardProps[] = []

    // eventsData가 배열인지 확인
    if (!Array.isArray(eventsData)) {
      return expanded
    }

    eventsData.forEach((event) => {
      const start = dayjs(event.startDate)
      const end = dayjs(event.endDate)
      let current = start

      while (current.isBefore(end) || current.isSame(end, 'day')) {
        expanded.push({
          ...event,
          startDate: event.startDate,
          endDate: event.endDate,
          displayDate: current.format('YYYY-MM-DD'),
        })
        current = current.add(1, 'day')
      }
    })

    return expanded
  }

  // events가 배열인지 확인하고 안전하게 처리
  const expandedEvents =
    events && Array.isArray(events) ? expandEvents(events) : []

  const handleDayClick = (date: string) => {
    setSelectedDate(date)
  }

  const handleCloseModal = () => {
    setSelectedDate(null)
  }

  const previousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  const renderDays = () => {
    const daysArray = []
    // 이전 달의 빈 칸
    for (let i = 0; i < startOfMonth; i += 1) {
      daysArray.push(<div key={`blank-${i}`} className="h-16" />)
    }

    // 이번 달의 날짜
    for (let i = 1; i <= daysInMonth; i += 1) {
      const currentDay = currentDate.date(i).format('YYYY-MM-DD')

      const dayEvents = expandedEvents.filter((event) =>
        dayjs(event.displayDate).isSame(currentDay, 'day'),
      )

      const isToday = today.date() === i && today.month() + 1 === currentMonth // 시스템 날짜 == 캘린더 날짜

      daysArray.push(
        <div key={i} className="w-[138px] min-h-[183px] border-t-2">
          <div
            className={`w-full h-full text-2xl font-bold p-3 cursor-pointer hover:bg-lightgray/50 flex flex-col items-start ${
              isToday ? 'border-primary bg-lightgray/30' : ''
            }`}
            onClick={() => handleDayClick(currentDay)}
          >
            {i}
            <div className="text-xs font-medium">
              {dayEvents.map((event) => {
                const start = dayjs(event.startDate)
                const end = dayjs(event.endDate)
                const isSameDate = start.isSame(end, 'day')

                return (
                  <CalendarEventCard
                    key={`${event.id}-${event.startDate}`}
                    title={event.title}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    category={event.category}
                    url={event.url}
                    name={event.name}
                    userId={event.userId}
                    className="mt-3"
                    displayDate={
                      isSameDate
                        ? start.format('MM.DD')
                        : `${start.format('MM.DD')} - ${end.format('MM.DD')}`
                    }
                  />
                )
              })}
            </div>
          </div>
        </div>,
      )
    }

    return daysArray
  }

  const eventsForSelectedDate = expandedEvents.filter(
    (event) => event.displayDate === selectedDate,
  )
  return (
    <div className="w-[1200px] mx-auto pt-4">
      {/* 월과 네비게이션 */}
      <div className="relative flex justify-center gap-5 items-center mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="text-lg w-9 h-9 rounded-full border text-center pb-1 font-semibold"
        >
          &lt;
        </button>
        <h2 className="text-2xl w-24 font-bold">
          {currentDate.format('YYYY.MM')}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          className="text-lg w-9 h-9 rounded-full border text-center pb-1 font-semibold"
        >
          &gt;
        </button>
        <MdOutlineCalendarMonth className="absolute right-0 w-8 h-8 text-gray" />
      </div>
      {/* 요일 */}
      <div className="grid grid-cols-7 text-center mb-2 gap-7">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-11 w-[138px] flex items-center justify-start font-semibold"
          >
            {day}
          </div>
        ))}
      </div>
      {/* 일 */}
      <div className="grid grid-cols-7 gap-7">{renderDays()}</div>

      {selectedDate && typeof currentUserId === 'number' && (
        <EventsDetailModal
          date={dayjs(selectedDate).format('MM.DD')}
          events={eventsForSelectedDate}
          onClose={handleCloseModal}
          currentUserId={currentUserId}
        />
      )}
    </div>
  )
}
