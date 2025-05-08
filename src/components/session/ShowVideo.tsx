'use client'

import AuthModal from '@/components/common/AuthModal'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getSingleSession } from '@/api/session/session'

export default function ShowVideo() {
  const params = useParams()
  const sessionId = params.id as string
  const [sessionUrl, setSessionUrl] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, checkAuth } = useAuthStore()
  useEffect(() => {
    const doCheckAuth = async () => {
      await checkAuth()
      setLoadingAuth(false)
    }
    doCheckAuth()
  }, [checkAuth])
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
  useEffect(() => {
    if (!loadingAuth && !sessionLoading) {
      if (user === null) {
        setAuthModalOpen(true)
      } else {
        setAuthModalOpen(false)
      }
    }
  }, [loadingAuth, sessionLoading, user])
  if (loadingAuth || sessionLoading) {
    return null
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
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
            onClick={() => (window.location.href = '/session')}
            className="absolute z-40 flex items-center justify-center text-white text-gray-500 rounded-full top-6 right-6 w-7 h-7 bg-black/60 hover:text-white/70"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
