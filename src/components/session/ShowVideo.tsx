'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AuthModal from '@/components/common/AuthModal'
import { useAuthStore } from '@/store/authStore'
import { getSingleSession } from '@/app/session/_lib/getSingleSession'

export default function ShowVideo() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params.id as string

  // 세션 비디오 URL
  const [sessionUrl, setSessionUrl] = useState('')
  // 로딩 상태
  const [loadingAuth, setLoadingAuth] = useState(true) // 유저 인증 로딩
  const [sessionLoading, setSessionLoading] = useState(true) // 세션 데이터 로딩
  // 인증 모달
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Zustand 인증
  const { user, checkAuth } = useAuthStore()

  // 1) 유저 인증 로딩
  useEffect(() => {
    const doCheckAuth = async () => {
      await checkAuth()
      setLoadingAuth(false)
    }
    doCheckAuth()
  }, [checkAuth])

  // 2) 세션 데이터 로딩
  useEffect(() => {
    const fetchSingleSession = async () => {
      if (!sessionId) {
        setSessionLoading(false)
        return
      }
      try {
        const singleVideo = await getSingleSession(sessionId)
        setSessionUrl(singleVideo.videoUrl)
      } catch (err) {
      } finally {
        setSessionLoading(false)
      }
    }
    fetchSingleSession()
  }, [sessionId])

  // 3) 인증 + 세션 로딩이 끝난 뒤, user 상태를 보고 모달 여부 결정
  useEffect(() => {
    if (!loadingAuth && !sessionLoading) {
      // 두 로딩이 모두 끝난 후
      if (user === null) {
        setAuthModalOpen(true)
      } else {
        setAuthModalOpen(false)
      }
    }
  }, [loadingAuth, sessionLoading, user])

  // 뒤로 가기
  const onClickBack = () => {
    router.push('/session')
  }

  // 4) 아직 로딩 중이면 스켈레톤이나 빈 화면 표시 (간단히 null 처리)
  if (loadingAuth || sessionLoading) {
    return null // 혹은 스켈레톤 컴포넌트
  }

  // 5) 최종 렌더
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* 인증 모달 */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* 로그인된 상태라면 세션 영상 표시 */}
      {!authModalOpen && (
        <div className="relative p-4 rounded-lg">
          <iframe
            src={sessionUrl}
            allow="autoplay"
            width="640"
            height="480"
            title="Session Video"
          />
          <button
            onClick={onClickBack}
            className="absolute z-40 flex items-center justify-center text-white text-gray-500 rounded-full top-6 right-6 w-7 h-7 bg-black/60 hover:text-white/70"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
