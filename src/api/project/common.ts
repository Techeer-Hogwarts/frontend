import {
  GetAllTeamsFilter,
  TeamsResponse,
  UserProfile,
} from '@/types/project/project'

// 통일된 팀 목록 조회 API 함수
export const getAllTeams = async (
  filter?: GetAllTeamsFilter,
): Promise<TeamsResponse> => {
  try {
    const searchParams = new URLSearchParams()

    // 기본 파라미터
    searchParams.append('limit', (filter?.limit || 12).toString())
    searchParams.append('sortType', filter?.sortType || 'UPDATE_AT_DESC')

    // 커서 데이터 처리 - 팀 타입 유무에 따라 다르게 처리
    if (filter?.id !== undefined) {
      searchParams.append('id', filter.id.toString())
    }

    // 팀 타입이 없는 경우 (전체보기): 모든 정렬에서 dateCursor 사용
    if (!filter?.teamTypes || filter.teamTypes.length === 0) {
      if (filter?.dateCursor) {
        searchParams.append('dateCursor', filter.dateCursor)
      }
      // 조회수순, 좋아요순일 때 countCursor도 함께 사용
      if (
        (filter?.sortType === 'VIEW_COUNT_DESC' ||
          filter?.sortType === 'LIKE_COUNT_DESC') &&
        filter?.countCursor !== undefined
      ) {
        searchParams.append('countCursor', filter.countCursor.toString())
      }
    }
    // 팀 타입이 있는 경우 (프로젝트/스터디): 기존 로직
    else {
      if (filter?.sortType === 'UPDATE_AT_DESC' && filter?.dateCursor) {
        searchParams.append('dateCursor', filter.dateCursor)
      } else if (
        (filter?.sortType === 'VIEW_COUNT_DESC' ||
          filter?.sortType === 'LIKE_COUNT_DESC') &&
        filter?.countCursor !== undefined
      ) {
        searchParams.append('countCursor', filter.countCursor.toString())
      }
    }

    // 필터링 조건
    if (filter?.teamTypes && filter.teamTypes.length > 0) {
      filter.teamTypes.forEach((type) => {
        searchParams.append('teamTypes', type)
      })
    }

    if (filter?.positions && filter.positions.length > 0) {
      filter.positions.forEach((position) => {
        searchParams.append('positions', position)
      })
    }

    if (filter?.isRecruited !== undefined && filter?.isRecruited !== null) {
      searchParams.append('isRecruited', filter.isRecruited.toString())
    }

    if (filter?.isFinished !== undefined && filter?.isFinished !== null) {
      searchParams.append('isFinished', filter.isFinished.toString())
    }

    const url = `/api/v1/projectTeams/allTeams?${searchParams.toString()}`

    console.log('🔄 API 요청:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GET 요청 실패: ${response.status} - ${errorText}`)
    }

    const result = await response.json()

    // 응답 구조 정규화
    if (result.teams) {
      return {
        allTeams: result.teams,
        nextInfo: result.nextInfo,
      }
    }

    return result as TeamsResponse
  } catch (error: any) {
    throw error
  }
}

// 첫 번째 페이지 조회용 헬퍼 함수
export const getInitialTeams = async (
  filters?: Omit<GetAllTeamsFilter, 'id' | 'dateCursor' | 'countCursor'>,
): Promise<TeamsResponse> => {
  return getAllTeams({
    ...filters,
    limit: filters?.limit || 12,
    // 커서 정보 없음 (첫 페이지)
    id: undefined,
    dateCursor: undefined,
    countCursor: undefined,
  })
}

// 다음 페이지 조회용 헬퍼 함수
export const getNextTeams = async (
  nextInfo: TeamsResponse['nextInfo'],
  filters?: Omit<GetAllTeamsFilter, 'id' | 'dateCursor' | 'countCursor'>,
): Promise<TeamsResponse> => {
  if (!nextInfo || !nextInfo.hasNext) {
    return { allTeams: [], nextInfo: undefined }
  }

  return getAllTeams({
    ...filters,
    limit: filters?.limit || 12,
    // 커서 정보 설정 - 팀 타입 유무에 따라 다르게 처리
    id: nextInfo.id,
    // 전체보기: 모든 정렬에서 dateCursor 사용
    // 팀 타입 있음: UPDATE_AT_DESC에서만 dateCursor 사용
    dateCursor:
      !filters?.teamTypes || filters.teamTypes.length === 0
        ? nextInfo.dateCursor
        : nextInfo.sortType === 'UPDATE_AT_DESC'
          ? nextInfo.dateCursor
          : undefined,
    countCursor: ['VIEW_COUNT_DESC', 'LIKE_COUNT_DESC'].includes(
      nextInfo.sortType,
    )
      ? nextInfo.countCursor
      : undefined,
    sortType: nextInfo.sortType as any,
  })
}

// 테커 모든 인원 조회
export const getAllUsers = async () => {
  try {
    const response = await fetch(`/api/v1/users/profiles?offset=0&limit=200`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

//사용자 정보 가져오기
export const getMyInfo = async (): Promise<UserProfile> => {
  try {
    const response = await fetch(`/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result: UserProfile = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}
