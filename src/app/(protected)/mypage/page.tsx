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
import Feedback from '@/components/mypage/Feedback'
import { useFetchProfile } from '@/hooks/mypage/useFetchProfile'

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    | 'home'
    | 'profile'
    | 'resume'
    | 'bookmark'
    | 'likes'
    | 'feedback'
    | 'settings'
  >('home')

  const { profile, loading, error } = useFetchProfile()

  return (
    <div className="flex gap-[4.375rem] mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox
          profile={profile}
          loading={loading}
          error={error?.message}
        />
        <MypageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && (
        <Home
          techStacks={profile?.techStacks}
          projectTeams={profile?.projectTeams}
          studyTeams={profile?.studyTeams}
          experiences={profile?.experiences}
        />
      )}
      {activeTab === 'profile' && <Profile profile={profile} />}
      {activeTab === 'resume' && <Resume userId={Number(profile?.id)} />}
      {activeTab === 'bookmark' && <Bookmark />}
      {activeTab === 'likes' && <Likes />}
      {activeTab === 'feedback' && <Feedback />}
      {activeTab === 'settings' && <Settings />}
    </div>
  )
}
