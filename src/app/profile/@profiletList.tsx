'use client'

import ProfileCard from '@/components/profile/ProfileCard'
import { useGetProfileQuery } from './query/useGetProfileQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ProfileQueryParams } from '@/types/queryParams'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SkeletonProfileCard from '@/components/profile/SkeletonProfileCard'
import { Profile } from '@/types/profile'
import { useProfiles } from '@/hooks/profile/useProfiles'

export default function ProfileList(props: ProfileQueryParams = {}) {
  const { profiles, isLoading, isError, ref } = useProfiles(props)

  if (isLoading && profiles.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonProfileCard key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  // if (isError || (data && profiles.length === 0)) {
  if (isError || profiles.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="프로필 데이터가 없습니다."
          text2="다시 조회해주세요"
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          name={profile.name}
          mainPosition={profile.mainPosition}
          profileImage={profile.profileImage}
          school={profile.school}
          grade={profile.grade}
          year={profile.year}
          stack={profile.stack}
          projectTeams={profile.projectTeams}
        />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  )
}
