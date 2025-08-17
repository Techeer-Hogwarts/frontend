'use client'

import { useRouter } from 'next/navigation'
import PreviousCSSection from './PreviousCsSection'
import { useTodayCsQuery } from '@/api/cs'

export default function TodayCSBox() {
  const router = useRouter()
  const { data: todayCs } = useTodayCsQuery()

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-[2rem] font-bold">오늘의 CS</h1>
        {/* <p className="text-lg text-gray">2025년 03월 28일</p> */}
      </div>

      <div className="flex justify-between items-center mb-[3.5rem] border border-primary px-6 py-8 rounded-xl text-xl font-semibold">
        <p className="max-w-[56.25rem]">{todayCs.content}</p>
        <button
          onClick={() => router.push(`/cs/${todayCs.problemId}`)}
          className="w-[12.5rem] h-[2.5rem] bg-primary text-white rounded-xl hover:bg-darkPrimary"
        >
          CS 풀기
        </button>
      </div>

      <PreviousCSSection />
    </div>
  )
}
