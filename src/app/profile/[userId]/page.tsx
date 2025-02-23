'use client'

import { useEffect, useState } from 'react'
import Home from '@/components/mypage/Home'
import Resume from '@/components/mypage/Resume'
import Profile from '@/components/mypage/Profile'
import ProfileBox from '@/components/profile/ProfileBox'
import ProfilepageTap from '@/components/profile/ProfilepageTap'
import { fetchUserProfile } from '../api/getUserProfile'


export default function Page({ params }: { params: { userId: string } }) {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'resume'>(
    'home',
  )

  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { userId } = params

  useEffect(() => {
    if (userId) {
      fetchUserProfile(Number(userId))
        .then((data) => {
          setProfileData(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error('유저 프로필 데이터 가져오기 실패:', err)
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <div className="flex gap-16 mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox profile={profileData} loading={false} error={''} />
        <ProfilepageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'profile' && <Profile profile={profileData} />}
      {activeTab === 'resume' && (
        <Resume userId={Number(userId)} offset={0} limit={10} />
      )}
    </div>
  )
}
