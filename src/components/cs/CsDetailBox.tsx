'use client'

import { useState } from 'react'

interface CSDetailBoxProps {
  id: string
}

const problemMap: Record<string, { title: string; date: string }> = {
  '1': {
    title:
      'tanstack-query에서 stale time과 gc time의 차이점에 대해서 설명해주세요.',
    date: '2025년 03월 28일',
  },
  '2': {
    title: '엔티티 매니저에 대해 설명해주세요.',
    date: '2025년 03월 26일',
  },
  '3': {
    title: '리액트의 render phase와 commit phase에 대해서 설명해주세요.',
    date: '2025년 03월 25일',
  },
  '4': {
    title: 'OSIV(Open Session In View) 옵션에 대해서 설명해주세요.',
    date: '2025년 03월 24일',
  },
}

export default function CSDetailBox({ id }: CSDetailBoxProps) {
  const problem = problemMap[id] || {
    title: '문제를 찾을 수 없습니다.',
    date: '',
  }
  const [answer, setAnswer] = useState('')

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <h1 className="text-[2rem] font-bold mb-5">오늘의 CS</h1>
      <p className="text-primary text-lg mb-3">{problem.date}</p>
      <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
        <p>{problem.title}</p>
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
