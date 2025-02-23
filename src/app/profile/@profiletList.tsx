'use client'

import ProfileCard from '@/components/profile/ProfileCard'
import { useGetProfileQuery } from './query/useGetProfileQuery'
import EmptyLottie from '@/components/common/EmptyLottie'
import { ProfileQueryParams } from '@/types/queryParams'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SkeletonProfileCard from '@/components/profile/SkeletonProfileCard'

interface Profile {
  id: number
  profileImage: string
  name: string
  school: string
  grade: string
  mainPosition: string
  year: number
  stack: string[]
  projectTeams: {
    mainImage: string
  }
}

export default function ProfileList({
  position = [],
  year = [],
  university = [],
  grade = [],
}: ProfileQueryParams = {}) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [limit, setLimit] = useState(8)
  const [ref, inView] = useInView({ threshold: 0.5 })

  const { data, isError, isLoading } = useGetProfileQuery({
    position,
    year,
    university,
    grade,
    limit,
  })
  useEffect(() => {
    setProfiles([])
    setLimit(12)
  }, [position, year, university, grade])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setProfiles((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newProfiles = data.filter((p) => !existingIds.has(p.id)) // 중복 제거
        return [...prev, ...newProfiles]
      })
    }
  }, [data])

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 8)
    }
  }, [inView])

  if (isLoading && profiles.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonProfileCard key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  if (isError || (data && profiles.length === 0)) {
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
          mainImage={profile.projectTeams.mainImage}
        />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  )
}
