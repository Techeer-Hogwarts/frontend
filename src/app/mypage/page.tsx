'use client'

import { useEffect, useState } from 'react'
import Home from '@/components/mypage/Home'
import Likes from '@/components/mypage/Likes'
import Resume from '@/components/mypage/Resume'
import Profile from '@/components/mypage/Profile'
import Settings from '@/components/mypage/Settings'
import Bookmark from '@/components/mypage/Bookmark'
import MypageTap from '@/components/mypage/MypageTap'
import ProfileBox from '@/components/profile/ProfileBox'

interface Experience {
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
}

interface ProfileData {
  profileImage: string
  name: string
  email: string
  school: string
  grade: string
  year: number
  mainPosition: string
  subPosition: string
  githubUrl: string
  mediumUrl: string
  velogUrl: string
  tistoryUrl: string
  isLft: boolean
  experiences?: Experience[]
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'profile' | 'resume' | 'bookmark' | 'likes' | 'settings'
  >('home')

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/v1/users', {
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(
            errorData?.message || '유저 정보를 불러오지 못했습니다.',
          )
        }
        const result = await response.json()
        setProfile(result as ProfileData)
      } catch (err: any) {
        console.error(err)
        setError(err.message || '유저 정보를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <div className="flex gap-16 mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox profile={profile} loading={loading} error={error} />
        <MypageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'profile' && <Profile profile={profile} />}
      {activeTab === 'resume' && <Resume />}
      {activeTab === 'bookmark' && <Bookmark />}
      {activeTab === 'likes' && <Likes />}
      {activeTab === 'settings' && <Settings />}
    </div>
  )
}
