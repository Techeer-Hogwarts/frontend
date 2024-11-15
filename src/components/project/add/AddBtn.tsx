'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AddBtn() {
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  const handleClickBtn = () => {
    setIsOpen((prev) => !prev)
  }

  // 선택한 옵션을 로컬 스토리지에 저장하는 함수
  const handleOptionClick = (type: string) => {
    localStorage.setItem('projectType', type) // 'projectType'이라는 키로 저장
    setIsOpen(false) // 모달을 닫기 위해 상태 변경
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClickBtn}
        className="fixed right-36 bottom-8 w-12 h-12 rounded-full shadow-md flex justify-center items-center text-xl text-[#545454] bg-white border border-lightgray"
      >
        <Image src="/grayplus.png" alt="addBtn" width={15} height={15} />
      </button>
      {isOpen && (
        <div className="fixed text-black/60 flex flex-col shadow-md justify-center items-center right-36 bottom-[88px] w-24 rounded-md h-[66px] bg-white border border-lightgray">
          <Link
            href="/project/add/study"
            onClick={() => handleOptionClick('study')}
          >
            스터디
          </Link>
          <div className="h-[1px] w-16 my-1 bg-lightgray" />
          <Link
            href="/project/add/project"
            onClick={() => handleOptionClick('project')}
          >
            프로젝트
          </Link>
        </div>
      )}
    </div>
  )
}
