'use client'

import { useRouter } from 'next/navigation'
import CsQuestionList from './CsQuestionList'
import { useTodayCsQuery } from '@/api/cs'

export default function TodayCSBox() {
  const router = useRouter()
  const { data: todayCs, isLoading, error } = useTodayCsQuery()

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">최신 CS</h1>
        </div>
        <div className="border border-primary px-6 py-8 rounded-xl text-xl font-semibold">
          <p>CS 문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !todayCs) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">최신 CS</h1>
        </div>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold">
          <p>CS 문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-[2rem] font-bold">최신 CS</h1>
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

      <CsQuestionList />
    </div>
  )
}
