'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAllTeams } from '@/api/project/common'
import type {
  TeamFilter,
  Team,
  GetAllTeamsFilter,
} from '@/types/project/project'

export const useTeamsList = (filters: TeamFilter) => {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextInfo, setNextInfo] = useState<any>(null)
  const [hasNext, setHasNext] = useState(true)

  // Intersection Observer for infinite scroll
  const [ref, inView] = useInView({ threshold: 0.5 })

  // 포지션 매핑 함수
  const mapPositions = (positions: string[]) => {
    const positionMap: Record<string, string> = {
      프론트엔드: 'FRONTEND',
      백엔드: 'BACKEND',
      데브옵스: 'DEVOPS',
      풀스택: 'FULLSTACK',
      데이터엔지니어: 'DATA_ENGINEER',
    }

    return positions
      .map((pos) => positionMap[pos] || pos.toUpperCase())
      .filter(Boolean)
  }

  // 필터를 API 형태로 변환 (첫 페이지용)
  const buildApiFilters = (
    baseFilters: GetAllTeamsFilter = {},
  ): GetAllTeamsFilter => ({
    limit: 12,
    sortType: filters.sortType || 'UPDATE_AT_DESC',
    teamTypes: filters.teamTypes,
    positions: filters.positions
      ? (mapPositions(filters.positions) as any)
      : undefined,
    isRecruited: filters.isRecruited,
    isFinished: filters.isFinished,
    ...baseFilters, // 커서 정보 등 덮어쓰기
    // 첫 페이지 요청시에는 커서 정보 제거
    ...(Object.keys(baseFilters).length === 0 && {
      id: undefined,
      dateCursor: undefined,
      countCursor: undefined,
    }),
  })

  // 첫 페이지 로드
  const loadInitialTeams = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 커서 정보 초기화 (첫 페이지이므로)
      setNextInfo(null)
      setHasNext(true)

      const apiFilters = buildApiFilters()
      const response = await getAllTeams(apiFilters)
      const newTeams = response.allTeams || []

      setTeams(newTeams)
      setNextInfo(response.nextInfo)
      setHasNext(response.nextInfo?.hasNext || false)
    } catch (err) {
      // 스터디 관련 에러인 경우 특별 처리
      if (filters.teamTypes?.includes('STUDY')) {
        setError(
          '스터디 데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        )
      } else {
        setError(err instanceof Error ? err.message : '로드 실패')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 다음 페이지 로드
  const loadMoreTeams = async () => {
    if (!hasNext || !nextInfo || isLoadingMore) return

    try {
      setIsLoadingMore(true)

      const apiFilters = buildApiFilters({
        // 커서 정보
        id: nextInfo.id,
        dateCursor:
          nextInfo.sortType === 'UPDATE_AT_DESC'
            ? nextInfo.dateCursor
            : undefined,
        countCursor: ['VIEW_COUNT_DESC', 'LIKE_COUNT_DESC'].includes(
          nextInfo.sortType,
        )
          ? nextInfo.countCursor
          : undefined,
        sortType: nextInfo.sortType,
      })

      const response = await getAllTeams(apiFilters)
      const newTeams = response.allTeams || []

      // 중복 제거하면서 추가
      setTeams((prev) => {
        const existingIds = new Set(
          prev.map((team) => `${team.type}-${team.id}`),
        )
        const uniqueNewTeams = newTeams.filter(
          (team: any) => !existingIds.has(`${team.type}-${team.id}`),
        )
        return [...prev, ...uniqueNewTeams]
      })

      setNextInfo(response.nextInfo)
      setHasNext(response.nextInfo?.hasNext || false)
    } catch (err) {
    } finally {
      setIsLoadingMore(false)
    }
  }

  // 필터 변경 시 첫 페이지 다시 로드
  useEffect(() => {
    loadInitialTeams()
  }, [JSON.stringify(filters)])

  // 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNext && !isLoadingMore && teams.length > 0) {
      loadMoreTeams()
    }
  }, [inView, hasNext, isLoadingMore, teams.length])

  return {
    teams,
    isLoading,
    isLoadingMore,
    error,
    hasNext,
    loadMoreRef: ref,
  }
}
