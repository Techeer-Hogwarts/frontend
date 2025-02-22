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
import AuthModal from '@/components/common/AuthModal'

// 더미 데이터 정의
const dummyProjectTeams = [
  { id: 1, name: 'Project Alpha', mainImage: '/images/project/example.png' },
  { id: 2, name: 'Project Beta', mainImage: '/images/project/example.png' },
  { id: 3, name: 'Project Gamma', mainImage: '/images/project/example.png' },
  { id: 4, name: 'Project Delta', mainImage: '/images/project/example.png' },
  { id: 5, name: 'Project 1', mainImage: '/images/project/example.png' },
  { id: 6, name: 'Project 2', mainImage: '/images/project/example.png' },
  { id: 7, name: 'Project 3', mainImage: '/images/project/example.png' },
  { id: 8, name: 'Project 4', mainImage: '/images/project/example.png' },
  { id: 9, name: 'Project 2', mainImage: '/images/project/example.png' },
  { id: 10, name: 'Project 3', mainImage: '/images/project/example.png' },
  { id: 11, name: 'Project 4', mainImage: '/images/project/example.png' },
  { id: 12, name: 'Project 5', mainImage: '/images/project/example.png' },
]

const dummyStudyTeams = [
  { id: 1, name: 'Study Group A', mainImage: '/images/project/example.png' },
  { id: 2, name: 'Study Group B', mainImage: '/images/project/example.png' },
  { id: 3, name: 'Study Group C', mainImage: '/images/project/example.png' },
  { id: 4, name: 'Study Group D', mainImage: '/images/project/example.png' },
]

interface Experience {
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
}

interface Team {
  id: number
  name: string
  mainImage: string
}

interface ProfileData {
  id: number
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
  projectTeams?: Team[]
  studyTeams?: Team[]
  experiences?: Experience[]
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'profile' | 'resume' | 'bookmark' | 'likes' | 'settings'
  >('home')

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/v1/users', {
          method: 'GET',
          credentials: 'include',
        })

        if (response.status === 401) {
          // 401이면 로그인 모달 오픈
          setAuthModalOpen(true)
          return
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(
            errorData?.message || '유저 정보를 불러오지 못했습니다.',
          )
        }
        const result = await response.json()
        setProfile(result as ProfileData)
      } catch (err: any) {
        setError('유저 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <div className="flex gap-16 mt-10">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6 ">
        <ProfileBox profile={profile} loading={loading} error={error} />
        <MypageTap activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/** 우측 컨텐츠 영역 */}
      {activeTab === 'home' && (
        <Home
          projectTeams={dummyProjectTeams}
          studyTeams={dummyStudyTeams}
          experiences={profile?.experiences}
        />
      )}
      {activeTab === 'profile' && <Profile profile={profile} />}
      {activeTab === 'resume' && <Resume />}
      {activeTab === 'bookmark' && <Bookmark />}
      {activeTab === 'likes' && <Likes />}
      {activeTab === 'settings' && <Settings />}
    </div>
  )
}
