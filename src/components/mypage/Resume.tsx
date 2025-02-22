'use client'

import React, { useState } from 'react'
import ResumeFolder from '../resume/ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'

export default function Resume() {
  const [modal, setModal] = useState(false)

  const [selectedPosition, setSelectedPosition] = useState<string | undefined>(
    undefined,
  )
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined,
  )
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
        {/* <ResumeFolder
          position={selectedPosition}
          year={selectedYear}
          offset={0}
          limit={10}
        /> */}
      </Link>
    </div>
  )
}
