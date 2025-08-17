'use client'

import { useState } from 'react'
import { useCsProblemDetailQuery } from '@/api/cs'

interface CSDetailBoxProps {
  id: string
}

export default function CSDetailBox({ id }: CSDetailBoxProps) {
  const [answer, setAnswer] = useState('')

  const {
    data: problemDetail,
    isLoading,
    error,
  } = useCsProblemDetailQuery(Number(id))

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <h1 className="text-[2rem] font-bold mb-5">오늘의 CS</h1>
        <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !problemDetail) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <h1 className="text-[2rem] font-bold mb-5">오늘의 CS</h1>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <h1 className="text-[2rem] font-bold mb-5">오늘의 CS</h1>
      {/* <p className="text-primary text-lg mb-3">2025년 03월 28일</p> */}
      <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
        <p>{problemDetail.content}</p>
      </div>

      <div className="mb-5">
        <p className="text-xl font-semibold text-primary mb-3">답변</p>
        <textarea
          placeholder="답변을 작성해주세요"
          className="w-full h-[12rem] border border-gray rounded-xl p-4 resize-none focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </div>

      <button
        className={`w-full h-[3rem] rounded-xl text-white ${answer.trim() ? 'bg-primary hover:bg-darkPrimary' : 'bg-lightgray'}`}
        disabled={!answer.trim()}
      >
        제출
      </button>
    </div>
  )
}
