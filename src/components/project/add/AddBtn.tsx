'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthModal from '@/components/common/AuthModal'
import { useAuthStore } from '@/store/authStore'

export default function AddBtn() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user } = useAuthStore()

  const handleClickBtn = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionClick = (type: string) => {
    if (!user) {
      // 로그인 안 되어있으면 AuthModal 열기
      setAuthModalOpen(true)
      return
    }
    setIsOpen(false) // 모달을 닫기 위해 상태 변경
    router.push(`/project/add/${type}`)
  }

  return (
    <div className="relative">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      <button
        onClick={handleClickBtn}
        className="fixed right-36 bottom-8 w-12 h-12 bg-primary rounded-full shadow-md flex items-center justify-center"
      >
        <Image src="/whiteplus.png" alt="addBtn" width={15} height={15} />
      </button>
      {isOpen && (
        <div className="fixed text-black/60 flex flex-col shadow-md justify-center items-center right-36 bottom-[88px] w-24 rounded-md h-[66px] bg-white border border-lightgray cursor-pointer">
          <div onClick={() => handleOptionClick('study')}>스터디</div>
          <div className="h-[1px] w-16 my-1 bg-lightgray" />
          <div onClick={() => handleOptionClick('project')}>프로젝트</div>
        </div>
      )}
    </div>
  )
}
