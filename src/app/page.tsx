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
  const { isLoggedIn, checkAuth } = useAuthStore()

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth()
    }

    checkAuthentication()
  }, [checkAuth])

  useEffect(() => {
    // 로그인된 상태에서도 온보딩 페이지를 볼 수 있도록 리다이렉트 제거
    if (isLoggedIn === true) {
    } else {
    }
  }, [isLoggedIn]) // router 의존성 제거

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
