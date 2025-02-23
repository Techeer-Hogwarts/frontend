'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter()
  const currentPath = usePathname()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[450px] bg-white text-darkgray rounded-xl py-5 flex flex-col gap-4">
        <h2 className="flex justify-center text-lg font-bold text-primary pb-5 border-b border-lightgray">
          TECHEER.ZIP
        </h2>
        <div className="flex flex-col items-center text-sm">
          <p>로그인이 필요한 서비스입니다.</p>
          <p>로그인 하시겠습니까?</p>
        </div>
        <div className="flex justify-between px-5">
          <button
            onClick={() => {
              onClose()
              if (currentPath === '/session' || currentPath === '/mypage' || currentPath === '/resume') router.back()
            }}
            className="w-[200px] px-4 py-2 bg-lightgray/30 font-semibold rounded-lg hover:bg-black/10"
          >
            취소
          </button>
          <button
            onClick={() => {
              onClose()
              router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
            }}
            className="w-[200px] px-4 py-2 bg-primary font-semibold rounded-lg text-white hover:bg-primary/80"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
