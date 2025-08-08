'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Page() {
  const router = useRouter()
  const { logout } = useAuthStore()

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleDeleteUser = async () => {
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        setIsError(true)
        setMessage(`회원탈퇴 실패: ${errorData?.message || '알 수 없는 오류'}`)
        return
      }

      // 성공
      setIsError(false)
      setMessage('회원탈퇴가 완료되었습니다.')
      await logout()
      setTimeout(() => {
        window.location.href = '/'
      }, 1200)
    } catch (error: any) {
      setIsError(true)
      setMessage('네트워크 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] justify-center items-center">
      <div className="w-[700px] text-left mb-7">
        <p className="text-2xl mb-5 font-bold">회원탈퇴</p>
        <p className="text-lg text-gray">
          TECHEER.ZIP를 이용해주셔서 감사합니다.
        </p>
        <div className="w-full h-[87px] border mt-2 text-sm border-gray bg-lightgray/50 flex flex-col justify-center px-4 gap-1">
          <p>불편한 사항이 있으시면 언제든 TECHEER.ZIP에게 알려주세요.</p>
          <p>techeerzip.cloud@gmail.com</p>
        </div>
        {/* 메시지 표시 영역 */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              isError ? 'text-red-500' : 'text-green'
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex justify-end gap-2 mt-16">
          <button
            type="button"
            className="w-[90px] h-10 border rounded-md text-gray border-lightgray"
            onClick={() => {
              router.back()
            }}
          >
            돌아가기
          </button>
          <button
            type="button"
            className="w-[90px] h-10 border rounded-md bg-primary text-white border-primary"
            onClick={handleDeleteUser}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  )
}
