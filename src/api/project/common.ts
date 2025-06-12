import {
  GetAllTeamsFilter,
  TeamsResponse,
  UserProfile,
} from '@/types/project/project'

// 프로젝트 팀 전체 조회
export const getAllTeams = async (
  filter?: GetAllTeamsFilter,
): Promise<TeamsResponse> => {
  try {
    // 커서 기반 페이지네이션을 위한 request 객체 구성
    const requestObject: any = {
      limit: filter?.limit || 12,
      sortType: filter?.sortType || 'UPDATE_AT_DESC',
    }

    // 커서 데이터 추가 (다음 페이지 조회 시)
    if (filter?.id !== undefined) {
      requestObject.id = filter.id
    }

    // 정렬 방식에 따른 커서 필드 설정
    if (filter?.sortType === 'UPDATE_AT_DESC') {
      if (filter?.dateCursor) {
        requestObject.dateCursor = filter.dateCursor
      }
    } else if (
      filter?.sortType === 'VIEW_COUNT_DESC' ||
      filter?.sortType === 'LIKE_COUNT_DESC'
    ) {
      if (filter?.countCursor !== undefined) {
        requestObject.countCursor = filter.countCursor
      }
    }

    // 필터링 조건 추가 (null이면 모든 팀 포함)
    if (filter?.teamTypes && filter.teamTypes.length > 0) {
      requestObject.teamTypes = filter.teamTypes
    }

    if (filter?.positions && filter.positions.length > 0) {
      requestObject.positions = filter.positions
    }

    if (filter?.isRecruited !== undefined && filter?.isRecruited !== null) {
      requestObject.isRecruited = filter.isRecruited
    }

    if (filter?.isFinished !== undefined && filter?.isFinished !== null) {
      requestObject.isFinished = filter.isFinished
    }

    // JSON 객체를 쿼리 파라미터로 전달
    const queryParams = new URLSearchParams({
      request: JSON.stringify(requestObject),
    })

    const url = `/api/v1/projectTeams/allTeams?${queryParams.toString()}`

    console.log('Request URL:', url)
    console.log('Request Object:', requestObject)

    // GET 요청, 쿼리 파라미터 방식
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('에러 응답:', errorText)
      throw new Error(`GET 요청 실패: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('API 응답:', result)

    // 커서 기반 응답 구조 처리
    if (result.teams) {
      return {
        allTeams: result.teams,
        nextInfo: result.nextInfo, // 다음 페이지를 위한 커서 정보
      }
    }

    return result as TeamsResponse
  } catch (error: any) {
    console.error('getAllTeams API 오류:', error)
    throw error
  }
}

// 첫 번째 로드를 위한 기본 조회 함수
export const getInitialTeams = async (
  filters?: Omit<GetAllTeamsFilter, 'id' | 'dateCursor' | 'countCursor'>,
): Promise<TeamsResponse> => {
  return getAllTeams({
    ...filters,
    // 첫 번째 조회이므로 커서 데이터 없음
    id: undefined,
    dateCursor: undefined,
    countCursor: undefined,
  })
}

// 다음 페이지 로드를 위한 함수
export const getNextTeams = async (
  nextInfo: TeamsResponse['nextInfo'],
  filters?: Omit<GetAllTeamsFilter, 'id' | 'dateCursor' | 'countCursor'>,
): Promise<TeamsResponse> => {
  if (!nextInfo || !nextInfo.hasNext) {
    return { allTeams: [] }
  }

  return getAllTeams({
    ...filters,
    id: nextInfo.id,
    dateCursor:
      nextInfo.sortType === 'UPDATE_AT_DESC' ? nextInfo.dateCursor : undefined,
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
