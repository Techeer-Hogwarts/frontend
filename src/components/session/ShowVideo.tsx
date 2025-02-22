'use client'

import { useParams, useRouter } from 'next/navigation'
import { getSingleSession } from '@/app/session/_lib/getSingleSession'
import { useEffect, useState } from 'react'

export default function ShowVideo() {
  const [session, setSession] = useState('')
  const router = useRouter()
  const params = useParams()
  const sessionId = params.id as string
  const onClickBack = () => {
    window.location.href = '/session'
  }
  useEffect(() => {
    const fetchSignleSession = async (sessionId: string) => {
      if (!sessionId) {
        console.error('Session ID is missing!')
        return
      }
      try {
        const singleVideo = await getSingleSession(sessionId)
        setSession(singleVideo.videoUrl)
      } catch (err) {
        console.error('세션 데이터 가져오기 실패:', err)
      }
    }
    console.log('Session ID:', sessionId)
    fetchSignleSession(sessionId)
  }, [sessionId])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 rounded-lg ">
        <iframe
          src={session}
          allow="autoplay"
          width="640"
          height="480"
        ></iframe>
        <button
          onClick={onClickBack}
          className="absolute z-40 flex items-center justify-center text-white text-gray-500 rounded-full top-6 right-6 w-7 h-7 bg-black/60 hover:text-white/70"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
