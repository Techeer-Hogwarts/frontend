'use client'

import AuthModal from '@/components/common/AuthModal'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getSingleSession } from '@/api/session/session'

export default function ShowVideo({ onClose }: { onClose?: () => void }) {
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
      {!authModalOpen && (
        <div className="relative p-4 rounded-lg">
          <iframe
            src={sessionUrl}
            allow="autoplay; fullscreen"
            allowFullScreen
            width="960"
            height="560"
            title="Session Video"
            className="rounded-lg"
          />

          <button
            onClick={onClose}
            className="absolute z-40 flex items-center justify-center text-white text-gray-500 rounded-full top-6 right-6 w-9 h-9 bg-black/60 hover:text-white/70 hover:bg-black/80 transition-all"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
