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
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

//프로젝트 페이지 불러오기
export const getAllTeams = async (token: string): Promise<TeamsResponse> => {
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.')
  }

  try {
    const response = await fetch(`${baseUrl}/projectTeams/allTeams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
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
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.')
  }

  try {
    const response = await fetch(
      `${baseUrl}/users/profiles?offset=0&limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

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
