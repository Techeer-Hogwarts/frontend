'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Section1 from '@/components/onboarding/Section1'
import Section2 from '@/components/onboarding/Section2'
import Section3 from '@/components/onboarding/Section3'
import Section4 from '@/components/onboarding/Section4'

export default function Onboarding() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn, checkAuth } = useAuthStore()
  const [isFromHome, setIsFromHome] = useState(false)
  const [hasCheckedReferrer, setHasCheckedReferrer] = useState(false)

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth()
    }

    checkAuthentication()

    // 홈페이지에서 온 경우인지 확인
    const referrer = document.referrer
    if (referrer.includes('/home')) {
      setIsFromHome(true)
    }
    setHasCheckedReferrer(true)
  }, [checkAuth])

  useEffect(() => {
    // referrer 체크가 완료되고, 홈페이지에서 온 경우가 아니고 로그인된 상태라면 홈페이지로 리다이렉트
    if (hasCheckedReferrer && isLoggedIn === true && !isFromHome) {
      router.replace('/home')
    }
  }, [isLoggedIn, router, isFromHome, hasCheckedReferrer])

  // 아직 referrer 체크 중이거나 로그인된 상태이고 홈페이지에서 온 경우가 아니라면 로딩 표시 (리다이렉트 중)
  if (!hasCheckedReferrer || (isLoggedIn === true && !isFromHome)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-500">홈페이지로 이동 중...</div>
      </div>
    )
  }

  // 온보딩 페이지 표시 (로그인 여부와 관계없이)
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
