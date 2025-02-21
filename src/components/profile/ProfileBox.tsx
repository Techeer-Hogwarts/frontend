'use client'

import React from 'react'
import Image from 'next/image'
import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'
import SkeletonProfileBox from './SkeletonProfileBox'

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
  experiences?: Experience[]
}

interface Experience {
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
}

interface ProfileBoxProps {
  profile: ProfileData | null
  loading: boolean
  error: string
}
export default function ProfileBox({
  profile,
  loading,
  error,
}: ProfileBoxProps) {
  if (loading) {
    return <SkeletonProfileBox />
  }
  if (error) {
    return <div className="text-red-500">{error}</div>
  }
  if (!profile) {
    return <SkeletonProfileBox />
  }

  console.log('profile:', profile)
  return (
    <div className="flex w-[19rem] h-[23rem]">
      {/* Folder 이미지 */}
      <div className="relative z-0">
        <Image src="/folder.svg" alt="Folder" width={242} height={374} />

        <div className="absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
          {/* 프로필 사진 */}
          <div className="flex w-[11rem] h-[11rem] bg-gray-200 rounded-xl overflow-hidden">
            <Image
              src={profile.profileImage || '/pro.png'}
              width={176}
              height={176}
              alt="Profile"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 이름/아이콘*/}
          <div className="flex flex-row justify-between mt-1">
            <div className="text-xl font-medium">{profile.name}</div>
            <div className="text-xl font-medium text-gray">{profile.email}</div>
            <div className="flex flex-row gap-2 items-center">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/git.svg" alt="GitHub" width={18} height={17} />
                </a>
              )}
              {profile.mediumUrl && (
                <a
                  href={profile.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/medium.svg" alt="Blog" width={18} height={18} />
                </a>
              )}
              {profile.velogUrl && (
                <a
                  href={profile.velogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/velog.svg" alt="Blog" width={18} height={18} />
                </a>
              )}
              {profile.tistoryUrl && (
                <a
                  href={profile.tistoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/tistory.svg" alt="Blog" width={18} height={18} />
                </a>
              )}
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex text-[0.75rem] text-gray">{profile.email}</div>

          {/* 소속 정보 */}
          <div className="flex flex-row justify-between gap-2 mt-1 text-[1rem]">
            <div className="max-w-16 truncate">{profile.school}</div>
            <span className="h-[1.25rem] border-r border-gray" />
            <div>{profile.grade}</div>
            <span className="h-[1.25rem] border-r border-gray" />
            <div>{profile.year}기</div>
          </div>

          {/* 포지션/경력 (mainPosition, subPosition) */}
          <div className="flex flex-row gap-2 mt-1">
            <PositionTag position={profile.mainPosition || ''} />
            {profile.experiences && profile.experiences.length > 0 && (
              <CareerTag career={profile.experiences[0].category} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
