'use client'

import React, { useEffect, useState } from 'react'
import HallOfFameCard from '@/components/home/HallOfFameCard'
import { HallOfFameMember } from '@/types/home/HallOfFame'
import { getRankings, RankingsResponse } from '@/api/home'

export default function HallOfFameSection() {
  const [rankings, setRankings] = useState<RankingsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true)
        setError(null)

        // 현재 년도와 이전 달 가져오기
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1 // 0-based index

        // 이전 달 계산 (1월이면 작년 12월로)
        let previousYear = currentYear
        let previousMonth = currentMonth - 1

        if (previousMonth === 0) {
          previousMonth = 12
          previousYear = currentYear - 1
        }

        const data = await getRankings(previousYear, previousMonth)
        setRankings(data)
      } catch (error) {
        setError('랭킹 데이터를 가져오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [])

  // 기본 멤버 정보 함수
  const getDefaultMember = (): HallOfFameMember => {
    return {
      id: 1,
      name: '코난',
      email: 'brian@naver.com',
      school: '한국공학대',
      status: '졸업',
      generation: '9기',
      mainPosition: 'Frontend',
      profileImage: '/profile.png',
    }
  }

  // 랭킹 데이터를 HallOfFameMember 형태로 변환
  const convertToHallOfFameMember = (user: any): HallOfFameMember => {
    if (!user) {
      return getDefaultMember()
    }

    return {
      id: user.id || 1,
      name: user.name || '코난',
      email: user.email || 'brian@naver.com',
      school: user.school || '한국공학대',
      status: user.grade || '졸업',
      generation: `${user.year || 9}기`,
      mainPosition: user.mainPosition || 'Frontend',
      profileImage: user.profileImage || '/profile.png',
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
    const mockMember: HallOfFameMember = {
      id: 1,
      name: '코난',
      email: 'brian@naver.com',
      school: '한국공학대',
      status: '졸업',
      generation: '9기',
      mainPosition: 'Frontend',
      profileImage: '/profile.png',
    }

    return (
      <div className="w-full mt-8">
        <div className="flex gap-8 justify-center min-h-[300px]">
          <HallOfFameCard title="이달의 터줌대감" member={mockMember} />
          <HallOfFameCard title="이달의 잔디인" member={mockMember} />
          <HallOfFameCard title="이달의 블로거" member={mockMember} />
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
            zoomTopUser
              ? convertToHallOfFameMember(zoomTopUser)
              : getDefaultMember()
          }
        />
        <HallOfFameCard
          title="이달의 잔디인"
          member={
            gitTopUser
              ? convertToHallOfFameMember(gitTopUser)
              : getDefaultMember()
          }
        />
        <HallOfFameCard
          title="이달의 블로거"
          member={
            blogTopUser
              ? convertToHallOfFameMember(blogTopUser)
              : getDefaultMember()
          }
        />
      </div>
    </div>
  )
}
