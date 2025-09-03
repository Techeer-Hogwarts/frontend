'use client'

import React from 'react'
import Image from 'next/image'
import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'
import SkeletonProfileBox from './SkeletonProfileBox'
import { ProfileData, Experience } from '@/types/mypage/mypage.types'

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
  if (loading || error) {
    return <SkeletonProfileBox />
  }
  if (error) {
    return <div className="text-red-500">{error}</div>
  }
  if (!profile) {
    return <SkeletonProfileBox />
  }

  const truncatedSchool =
    profile.school && profile.school.length > 12
      ? profile.school.slice(0, 12) + '...'
      : profile.school

  return (
    <div className="flex w-[19rem] h-[23rem]">
      {/* Folder 이미지 */}
      <div className="relative z-0">
        <Image src="/folder.svg" alt="Folder" width={242} height={374} />

        <div className="absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
          {/* 프로필 사진 */}
          <div className="flex w-[11rem] h-[11rem] bg-gray-200 rounded-xl overflow-hidden">
            <Image
              src={profile.profileImage || '/profile.png'}
              width={176}
              height={176}
              alt="ProfileInfo"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 이름/아이콘*/}
          <div className="flex flex-row justify-between mt-1">
            <div className="text-xl font-medium">{profile.name}</div>

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
          <div className="flex flex-row justify-between gap-1 mt-1 font-medium text-[0.8rem]">
            <div className="">{truncatedSchool}</div>
            <span className="h-[1.25rem] border-r border-gray" />
            <div>{profile.grade}</div>
            <span className="h-[1.25rem] border-r border-gray" />
            <div>{profile.year == 0 ? 'Leader' : `${profile.year}기`}</div>
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
