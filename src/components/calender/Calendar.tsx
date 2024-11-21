'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import eventsByMonth from './eventsByMonth' // 이벤트 가져오기

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const startOfMonth = currentDate.startOf('month').day()
  const daysInMonth = currentDate.daysInMonth()
  const currentMonth = currentDate.month() + 1 // month는 0부터 시작하므로 1을 더함
  const today = dayjs()

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
      const events = eventsByMonth[currentMonth]?.[i] || [] // 해당 월의 이벤트만 출력
      const isToday = today.date() === i && today.month() + 1 === currentMonth // 시스템 날짜 == 캘린더 날짜
      daysArray.push(
        <div
          key={i}
          className={`w-[138px] text-2xl font-bold h-[183px] border-t-2 p-2 ${
            isToday ? 'border-primary bg-lightgray/30' : ''
          }`}
        >
          {i}
          <div className="text-xs font-medium mt-2">
            {events.map((event, index) => (
              <span key={index} className="flex justify-start ">
                <div className="w-2 h-2 mt-1 mx-1 bg-[#0992FA] rounded-full" />
                <div className="flex flex-col">
                  <p className="text-[12px]">{event.name}</p>
                  <p className="text-[10px] text-gray">{event.period}</p>
                </div>
              </span>
            ))}
          </div>
        </div>,
      )
    }

    return daysArray
  }

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
    </div>
  )
}
