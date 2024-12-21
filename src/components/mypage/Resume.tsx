'use client'

import React, { useState } from 'react'
import ResumeFolder from '../resume/ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'

let resumes = [
  {
    name: '박명수',
    period: '8기',
    position: 'Frontend',
    career: '신입',
    date: '2024.09.21',
  },
  {
    name: '유재석',
    period: '7기',
    position: 'Backend',
    career: '경력',
    date: '2024.09.19',
  },
  {
    name: '정준하',
    period: '6기',
    position: 'DataEngineer',
    career: '신입',
    date: '2024.09.18',
  },
  {
    name: '하하',
    period: '4기',
    position: 'Backend',
    career: '경력',
    date: '2024.09.19',
  },
  {
    name: '노홍철',
    period: '8기',
    position: 'Frontend',
    career: '신입',
    date: '2024.09.21',
  },
]

export default function Resume() {
  const [modal, setModal] = useState(false)
  const handleClickAddResume = () => {
    setModal(!modal)
  }
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClickAddResume}
          className="border border-lightgray text-black flex items-center justify-center p-2 h-8 w-[130px] rounded-md"
        >
          이력서 추가
        </button>
        {modal && <AddResume setModal={setModal} />}
      </div>
      <Link href="/detail">
        <ResumeFolder resumes={resumes} />
      </Link>
    </div>
  )
}
