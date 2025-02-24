type TeamType = 'project' | 'study'

interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

interface ProjectTeam extends TeamBase {
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages: string[]
  teamStacks: { stackName: string; isMain: boolean }[]
}

interface StudyTeam extends TeamBase {
  type: 'study'
  recruitNum: number
  studyExplain: string
}

type Team = ProjectTeam | StudyTeam

interface TeamsResponse {
  allTeams: Team[]
}

interface ProjectTeam {
  id: number
  name: string
  resultImages: string[]
}

interface Experience {
  id: number
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
}

interface UserProfile {
  id: number
  profileImage: string
  name: string
  nickname: string
  email: string
  school: string
  grade: string
  mainPosition: string
  subPosition: string
  githubUrl: string | null
  mediumUrl: string | null
  velogUrl: string | null
  tistoryUrl: string | null
  isLft: boolean
  year: number
  stack: string[]
  projectTeams: ProjectTeam[]
  experiences: Experience[]
}

//프로젝트 페이지 불러오기
export interface GetAllTeamsFilter {
  isRecruited?: boolean
  isFinished?: boolean
  teamTypes?: string[] // 예: ['project', 'study']
  positions?: string[] // 예: ['frontend', 'backend', ...]
}

export const getAllTeams = async (
  filter?: GetAllTeamsFilter,
): Promise<TeamsResponse> => {
  try {
    let queryStr = ''
    if (filter) {
      const params = new URLSearchParams()

      if (filter.isRecruited !== undefined) {
        params.append('isRecruited', filter.isRecruited.toString())
      }
      if (filter.isFinished !== undefined) {
        params.append('isFinished', filter.isFinished.toString())
      }
      if (filter.teamTypes && filter.teamTypes.length > 0) {
        filter.teamTypes.forEach((type) => {
          params.append('teamTypes', type)
        })
      }
      if (filter.positions && filter.positions.length > 0) {
        filter.positions.forEach((position) => {
          params.append('positions', position)
        })
      }

      queryStr = '?' + params.toString()
    }

    const response = await fetch(`/api/v1/projectTeams/allTeams${queryStr}`, {
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

    // teamTypes 필터가 있을 경우 응답이 분리되어 올 수 있으므로 두 배열을 합칩니다.
    if (result.projectTeams !== undefined && result.studyTeams !== undefined) {
      return { allTeams: [...result.projectTeams, ...result.studyTeams] }
    }

    // 그 외 응답 구조(예: allTeams 키가 있는 경우)
    return result as TeamsResponse
  } catch (error: any) {
    console.error('팀 정보 가져오기 중 오류 발생:', error.message)
    throw error
  }
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
    console.error('사용자 목록 가져오기 중 오류 발생:', error.message)
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
    console.error('사용자 목록 가져오기 중 오류 발생:', error.message)
    throw error
  }
}
