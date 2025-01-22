type Team = {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  recruitNum: number
  studyExplain: string
}

type TeamsResponse = {
  code: number
  message: string
  data: {
    projectTeams: Team[]
    studyTeams: Team[]
  }
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
    return result.data
  } catch (error: any) {
    console.error('사용자 목록 가져오기 중 오류 발생:', error.message)
    throw error
  }
}
