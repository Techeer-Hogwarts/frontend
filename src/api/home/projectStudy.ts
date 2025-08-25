import { ProjectStudyTeam } from '../../types/home'

export interface AllTeamsApiResponse {
  teams: ProjectStudyTeam[]
}

export interface AllTeamsQueryParams {
  id?: number
  dateCursor?: string
  countCursor?: number
  limit?: number
  sortType?: 'UPDATE_AT_DESC' | 'VIEW_COUNT_DESC' | 'LIKE_COUNT_DESC'
  teamTypes?: ('PROJECT' | 'STUDY')[]
  positions?: (
    | 'FRONTEND'
    | 'BACKEND'
    | 'DEVOPS'
    | 'FULLSTACK'
    | 'DATA_ENGINEER'
  )[]
  isRecruited?: boolean
  isFinished?: boolean
}

export async function getAllTeams(
  params: AllTeamsQueryParams = {},
): Promise<AllTeamsApiResponse> {
  try {
    const queryParams = new URLSearchParams()

    if (params.id !== undefined) {
      queryParams.append('id', params.id.toString())
    }
    if (params.dateCursor) {
      queryParams.append('dateCursor', params.dateCursor)
    }
    if (params.countCursor !== undefined) {
      queryParams.append('countCursor', params.countCursor.toString())
    }
    if (params.limit) {
      queryParams.append('limit', params.limit.toString())
    }
    if (params.sortType) {
      queryParams.append('sortType', params.sortType)
    }
    if (params.teamTypes && params.teamTypes.length > 0) {
      params.teamTypes.forEach((type) => {
        queryParams.append('teamTypes', type)
      })
    }
    if (params.positions && params.positions.length > 0) {
      params.positions.forEach((position) => {
        queryParams.append('positions', position)
      })
    }
    if (params.isRecruited !== undefined) {
      queryParams.append('isRecruited', params.isRecruited.toString())
    }
    if (params.isFinished !== undefined) {
      queryParams.append('isFinished', params.isFinished.toString())
    }

    const apiUrl = `/api/v1/projectTeams/allTeams?${queryParams.toString()}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

// 홈 페이지용: 최신순으로 4개 프로젝트/스터디 팀 가져오기
export async function getLatestTeams(
  limit: number = 4,
): Promise<ProjectStudyTeam[]> {
  try {
    const response = await getAllTeams({
      limit,
      sortType: 'UPDATE_AT_DESC',
      teamTypes: ['PROJECT', 'STUDY'],
    })

    return response.teams
  } catch (error) {
    throw error
  }
}
