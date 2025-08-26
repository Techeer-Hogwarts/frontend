'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Section1 from '@/components/onboarding/Section1'
import Section2 from '@/components/onboarding/Section2'
import Section3 from '@/components/onboarding/Section3'
import Section4 from '@/components/onboarding/Section4'

export default function Onboarding() {
  const router = useRouter()
  const { isLoggedIn, checkAuth } = useAuthStore()

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth()
    }

    checkAuthentication()
  }, [checkAuth])

  useEffect(() => {
    if (isLoggedIn === true) {
      router.replace('/home')
    }
  }, [isLoggedIn, router])

  // 로그인된 상태라면 로딩 표시 (리다이렉트 중)
  if (isLoggedIn === true) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">홈페이지로 이동 중...</div>
      </div>
    )
  }

  // 로그인되지 않은 상태라면 온보딩 페이지 표시
  return (
    <>
      <style>{`
      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none;
      }
      html, body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
      <div className="relative flex flex-col gap-32">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </>
  )
}
