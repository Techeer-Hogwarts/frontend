'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { getRecentEvents, Event } from '@/api/home'

export default function ScheduleSection() {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const year = currentDate.year()
  const month = currentDate.month()

  const today = new Date()
  const startOfMonth = new Date(year, month, 1)
  const startDay = startOfMonth.getDay()
  const calendar: Date[][] = []
  const baseDate = new Date(year, month, 1 - startDay)

  for (let week = 0; week < 5; week++) {
    const weekRow: Date[] = []
    for (let day = 0; day < 7; day++) {
      weekRow.push(new Date(baseDate))
      baseDate.setDate(baseDate.getDate() + 1)
    }
    calendar.push(weekRow)
  }

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        const events: Event[] = await getRecentEvents(2)

        setRecentEvents(events)
      } catch (err) {
        const fallbackEvents = [
          {
            eventId: 1,
            eventUrl: '/calendar',
            title: 'Round Robin CS 문제 풀이',
            date: dayjs().format('YYYY-MM-DD'),
          },
          {
            eventId: 2,
            eventUrl: '/calendar',
            title: '프로젝트 팀 빌딩 세션',
            date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
          },
        ]

        setRecentEvents(fallbackEvents)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentEvents()
  }, [])

  return (
    <section className="w-full mt-12">
      <div className="relative border border-primary rounded-xl max-w-[1200px] w-full mx-auto px-12 py-12">
        {/* 타이틀 */}
        <div className="absolute -top-3 left-4 bg-white px-2 flex items-center">
          <Image
            src="/images/home/Schedule.svg"
            alt="달력 아이콘"
            width={20}
            height={20}
          />
          <h2 className="text-xl text-black ml-2">이달의 일정</h2>
          <div className="flex-1 h-[1px] bg-primary ml-2" />
        </div>

        <div className="flex flex-row items-center gap-6 mt-4">
          {/* 캘린더 영역 (좌측) */}
          <div className="w-1/2 pr-10">
            <div className="max-w-[300px] mx-auto">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() =>
                    setCurrentDate(currentDate.subtract(1, 'month'))
                  }
                >
                  ◀
                </button>
                <div className="font-semibold text-lg">
                  {currentDate.format('MMMM')}
                </div>
                <button
                  onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
                >
                  ▶
                </button>
              </div>

              <div className="grid grid-cols-7 text-sm place-items-center text-gray-500 font-bold mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                  <div
                    key={`day-${d}-${idx}`}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-sm text-center place-items-center">
                {calendar.flat().map((day, idx) => {
                  const isCurrentMonth =
                    day.getFullYear() === year && day.getMonth() === month
                  const isToday = isSameDate(day, today)
                  const isSelected =
                    selectedDate && isSameDate(day, selectedDate)

                  return (
                    <button
                      key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}-${idx}`}
                      onClick={() => setSelectedDate(day)}
                      className={`w-6 h-6 flex items-center justify-center rounded-full
                        ${isToday ? 'bg-primary text-white' : ''}
                        ${isSelected ? 'border border-primary' : ''}
                        ${!isCurrentMonth ? 'text-gray' : 'text-black'}
                      `}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 일정 영역 (우측) */}
          <div className="w-1/2 space-y-6 relative min-w-0">
            {/* 세로 선 */}
            <div className="absolute left-[49.5px] top-[40px] bottom-[30px] w-px bg-primary z-0" />

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-4 relative z-10">
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="text-sm font-bold text-black w-8 text-right">
                        {i}일
                      </div>
                      <div className="w-3 h-3 rounded-full bg-primary ml-[-8px]" />
                    </div>
                    <div className="bg-[#FFF7EF] border border-primary rounded-lg p-4 text-sm shadow-sm w-full max-w-full min-w-0 break-all flex flex-col gap-2">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-gray-500 text-center py-8">{error}</div>
            ) : recentEvents && recentEvents.length > 0 ? (
              recentEvents.map((event) => {
                const eventDate = dayjs(event.date)
                const day = eventDate.date()

                return (
                  <div
                    key={event.eventId}
                    className="flex items-start gap-4 relative z-10"
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="text-sm font-bold text-black w-8 text-right">
                        {day}일
                      </div>
                      <div className="w-3 h-3 rounded-full bg-primary ml-[-8px]" />
                    </div>

                    {/* 카드 */}
                    <div className="bg-[#FFF7EF] border border-primary rounded-lg p-4 text-sm shadow-sm w-full max-w-full min-w-0 break-all flex flex-col gap-2">
                      <div className="w-full break-all whitespace-pre-wrap">
                        <p className="font-semibold mb-1 break-all whitespace-pre-wrap">
                          {event.title}
                        </p>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Link
                          href={event.eventUrl || '/calendar'}
                          className="text-xs text-gray hover:text-primary flex items-center gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/home/Goto.svg"
                            alt="바로가기"
                            className="w-4 h-4"
                          />
                          바로가기
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-gray-500 text-center py-8">
                최근 일정이 없습니다.
              </div>
            )}

            {/* 더 보기 */}
            <div className="pl-[78px] text-sm mt-6">
              <div className="rounded-lg w-fit mx-auto">
                <Link
                  href="/calendar"
                  className="text-gray hover:underline block text-center"
                >
                  컨퍼런스 일정 더 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
