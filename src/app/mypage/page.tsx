'use client'

import { useState } from 'react'
import Home from '@/components/mypage/Home'
import Likes from '@/components/mypage/Likes'
import Resume from '@/components/mypage/Resume'
import Profile from '@/components/mypage/Profile'
import Settings from '@/components/mypage/Settings'
import Bookmark from '@/components/mypage/Bookmark'
import MypageTap from '@/components/mypage/MypageTap'
import ProfileBox from '@/components/profile/ProfileBox'

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'profile' | 'resume' | 'bookmark' | 'likes' | 'settings'
  >('home')

  const [profileData, setProfileData] = useState<any>(null)

  return (
    <div className="flex gap-16 mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox profileData={profileData} />
        <MypageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'profile' && <Profile />}
      {activeTab === 'resume' && <Resume />}
      {activeTab === 'bookmark' && <Bookmark />}
      {activeTab === 'likes' && <Likes />}
      {activeTab === 'settings' && <Settings />}
    </div>
  )
}
