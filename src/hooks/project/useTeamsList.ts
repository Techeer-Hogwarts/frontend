// hooks/project/useTeamsList.ts
'use client'
import { useState, useEffect } from 'react'
import type { TeamFilter, Team } from '@/types/project/project'

// 기본 팀 목록 조회 API 함수
const fetchTeams = async (filters: TeamFilter) => {
  const requestObject: any = {
    limit: 12, // 기본 12개만 조회
    sortType: filters.sortType || 'UPDATE_AT_DESC',
  }

  // 필터링 조건 추가
  if (filters.teamTypes?.length) {
    requestObject.teamTypes = filters.teamTypes
  }

  if (filters.positions?.length) {
    const positionMap: Record<string, string> = {
      프론트엔드: 'FRONTEND',
      백엔드: 'BACKEND',
      데브옵스: 'DEVOPS',
      풀스택: 'FULLSTACK',
      데이터엔지니어: 'DATA_ENGINEER',
    }
    requestObject.positions = filters.positions
      .map((pos) => positionMap[pos] || pos.toUpperCase())
      .filter(Boolean)
  }

  if (filters.isRecruited !== undefined && filters.isRecruited !== null) {
    requestObject.isRecruited = filters.isRecruited
  }

  if (filters.isFinished !== undefined && filters.isFinished !== null) {
    requestObject.isFinished = filters.isFinished
  }

  console.log('🔄 API 요청:', requestObject)

  const queryParams = new URLSearchParams({
    request: JSON.stringify(requestObject),
  })

  const response = await fetch(
    `/api/v1/projectTeams/allTeams?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API 오류: ${response.status}`)
  }

  const data = await response.json()
  console.log('📥 API 응답:', data)

  return data
}

export const useTeamsList = (filters: TeamFilter) => {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 필터 변경 시 데이터 다시 로드
  useEffect(() => {
    const loadTeams = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetchTeams(filters)
        const newTeams = response.teams || []

        setTeams(newTeams)
        console.log(`📦 받은 팀: ${newTeams.length}개`)
      } catch (err) {
        console.error('❌ 로드 실패:', err)
        setError(err instanceof Error ? err.message : '로드 실패')
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [JSON.stringify(filters)])

  return {
    teams,
    isLoading,
    error,
  }
}
