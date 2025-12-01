'use client'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTeamListQuery } from '@/api/project/common/queries'
import type { TeamFilter } from '@/types/project/project'

export const useTeamsList = (filters: TeamFilter) => {
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

  // 필터를 API 형태로 변환
  const apiFilters = {
    limit: 12,
    sortType: filters.sortType || 'UPDATE_AT_DESC',
    teamTypes: filters.teamTypes,
    positions: filters.positions
      ? (mapPositions(filters.positions) as any)
      : undefined,
    isRecruited: filters.isRecruited,
    isFinished: filters.isFinished,
  }

  // 새로운 TanStack Query 훅 사용
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useTeamListQuery(apiFilters)

  // Intersection Observer for infinite scroll
  const [ref, inView] = useInView({ threshold: 0.5 })

  // 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // 모든 페이지의 팀들을 하나의 배열로 합치기
  const teams = data?.pages.flatMap((page) => page.allTeams) || []

  return {
    teams,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    error: error?.message || null,
    hasNext: hasNextPage,
    loadMoreRef: ref,
  }
}
