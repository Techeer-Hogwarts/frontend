'use client'

import { useParams, useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'
import { getSingleSession } from '@/app/session/_lib/getSingleSession'
import { useEffect, useState } from 'react'

interface Session {
  videoUrl: string
}

export default function ShowVideo() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const params = useParams()
  const sessionId = params.id as string
  const onClickBack = () => {
    router.back()
  }
  useEffect(() => {
    const fetchSignleSession = async (sessionId: string) => {
      if (!sessionId) {
        console.error('Session ID is missing!')
        return
      }
      try {
        const singleVideo = await getSingleSession(sessionId)
        setSession(singleVideo)
      } catch (err) {
        console.error('세션 데이터 가져오기 실패:', err)
      }
    }
    console.log('Session ID:', sessionId)
    fetchSignleSession(sessionId)
  }, [sessionId])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" rounded-lg p-4 relative w-1/2">
        <button
          onClick={onClickBack}
          className="absolute top-6 right-6 z-40 text-gray-500 w-7 h-7 flex justify-center items-center text-white rounded-full bg-black/60 hover:text-white/70"
        >
          ✕
        </button>
        <div className="video-wrapper">
          <ReactPlayer url={session?.videoUrl} controls width="100%" />
        </div>
      </div>
    </div>
  )
}
