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
  uiuxNum: number
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
export const getAllTeams = async (): Promise<TeamsResponse> => {
  try {
    const response = await fetch(`/api/v1/projectTeams/allTeams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result: TeamsResponse = await response.json()
    return result
  } catch (error: any) {
    console.error('팀 정보 가져오기 중 오류 발생:', error.message)
    throw error
  }
}

// 테커 모든 인원 조회
export const getAllUsers = async () => {
  try {
    const response = await fetch(`/api/v1/users/profiles?offset=0&limit=10`, {
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
