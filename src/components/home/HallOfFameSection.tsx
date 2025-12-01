'use client'

import React from 'react'
import HallOfFameCard from '@/components/home/HallOfFameCard'
import { HallOfFameMember } from '@/types/home/HallOfFame'
import { useMonthlyRankingsQuery } from '@/api/home/queries'

export default function HallOfFameSection() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  let previousYear = currentYear
  let previousMonth = currentMonth - 1

  if (previousMonth === 0) {
    previousMonth = 12
    previousYear = currentYear - 1
  }

  const {
    data: rankings,
    isLoading: loading,
    error,
  } = useMonthlyRankingsQuery(previousYear, previousMonth)

  const convertToHallOfFameMember = (user: any): HallOfFameMember => {
    return {
      id: user.id || 1,
      name: user.name || '',
      email: user.email || '',
      school: user.school || '',
      status: user.grade || '',
      generation: `${user.year || 9}기` || '',
      mainPosition: user.mainPosition || '',
      profileImage: user.profileImage || '',
    }
  }

  if (loading) {
    return (
      <div className="w-full mt-8">
        <div className="flex gap-8 justify-center min-h-[300px]">
          <div className="animate-pulse bg-gray-200 rounded-lg w-80 h-80"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg w-80 h-80"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg w-80 h-80"></div>
        </div>
      </div>
    )
  }

  if (error || !rankings) {
    return (
      <div className="w-full mt-8">
        <div className="flex gap-8 justify-center min-h-[300px]">
          <HallOfFameCard title="이달의 터줌대감" />
          <HallOfFameCard title="이달의 잔디인" />
          <HallOfFameCard title="이달의 블로거" />
        </div>
      </div>
    )
  }

  // API 응답 구조에 맞게 수정 - 모든 랭킹이 user 객체를 포함
  const blogTopUser = rankings.blogRanking?.user
  const gitTopUser = rankings.gitContributionRanking?.user
  const zoomTopUser = rankings.zoomRanking?.user

  return (
    <div className="w-full mt-4">
      <div className="flex gap-8 justify-center min-h-[300px]">
        <HallOfFameCard
          title="이달의 터줌대감"
          member={
            zoomTopUser ? convertToHallOfFameMember(zoomTopUser) : undefined
          }
        />
        <HallOfFameCard
          title="이달의 잔디인"
          member={
            gitTopUser ? convertToHallOfFameMember(gitTopUser) : undefined
          }
        />
        <HallOfFameCard
          title="이달의 블로거"
          member={
            blogTopUser ? convertToHallOfFameMember(blogTopUser) : undefined
          }
        />
      </div>
    </div>
  )
}
