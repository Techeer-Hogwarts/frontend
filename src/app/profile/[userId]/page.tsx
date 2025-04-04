'use client'

import { useEffect, useState } from 'react'
import Home from '@/components/mypage/Home'
import Resume from '@/components/mypage/Resume'
import Profile from '@/components/mypage/Profile'
import ProfileBox from '@/components/profile/ProfileBox'
import ProfilepageTap from '@/components/profile/ProfilepageTap'
import { fetchUserProfile } from '../api/getUserProfile'
import Skeleton from '@/components/profile/Skeleton'
import AuthModal from '@/components/common/AuthModal'

export default function Page({ params }: { params: { userId: string } }) {
  // 로그인 모달 상태 추가
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<'home' | 'resume'>('home')

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
          setLoading(false)
        })
    }
  }, [userId])

  if (loading) return <Skeleton />

  return (
    <div className="flex gap-[4.375rem] mt-10">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox profile={profileData} loading={false} error={''} />
        <ProfilepageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && (
        <Home
          projectTeams={profileData?.projectTeams}
          studyTeams={profileData?.studyTeams}
          experiences={profileData?.experiences}
        />
      )}
      {/* {activeTab === 'profile' && <Profile profile={profileData} />} */}
      {activeTab === 'resume' && <Resume userId={Number(userId)} />}
    </div>
  )
}
