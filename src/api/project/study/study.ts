interface StudyDetail {
  id: number
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  githubLink: string
  notionLink: string
  studyExplain: string
  goal: string
  rule: string
  recruitNum: number
  recruitExplain: string
  resultImages: string[]
  studyMember: string[]
}

interface GetStudyDetailResponse {
  code: number
  message: string
  data: StudyDetail
}

interface ApplicantUser {
  name: string
  email: string
}

interface GetStudyApplicantsResponse {
  code: number
  message: string
  data: {
    studyName: string
    members: Array<{
      name: string
      isLeader: boolean
    }>
  }
}

// 스터디 추가하기
export const handleAddStudy = async (data) => {
  try {
    const response = await fetch(`/api/v1/studyTeams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('POST 요청 성공:', result)
    return result
  } catch (error: any) {
    console.error('POST 요청 중 오류 발생:', error.message)
    throw error
  }
}

// 스터디 수정하기
export const handleEditStudy = async (data, projectId) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/${projectId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('POST 요청 성공:', result)
    return result
  } catch (error: any) {
    console.error('POST 요청 중 오류 발생:', error.message)
    throw error
  }
}

// 스터디 상세 페이지 가져오기
export const getStudyDetail = async (
  studyTeamId: number,
): Promise<GetStudyDetailResponse> => {
  try {
    const response = await fetch(`/api/v1/studyTeams/${studyTeamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result: GetStudyDetailResponse = await response.json()
    return result
  } catch (error: any) {
    console.error('스터디 상세 가져오기 중 오류 발생:', error.message)
    throw error
  }
}

// 스터디 참여 멤버 가져오기
export const getStudyMember = async (
  studyTeamId: number,
): Promise<GetStudyApplicantsResponse> => {
  try {
    const response = await fetch(`/api/v1//studyTeams/${studyTeamId}/members`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result: GetStudyApplicantsResponse = await response.json()
    return result
  } catch (error: any) {
    console.error('스터디 참여 멤버 가져오기 중 오류 발생:', error.message)
    throw error
  }
}

// 스터디 지원하기
export const handleApplyStudy = async (data) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/apply`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('POST 요청 성공:', result)
    return result
  } catch (error: any) {
    console.error('POST 요청 중 오류 발생:', error.message)
    throw error
  }
}
// 스터디 지원 취소하기
export const handleDenyStudy = async (studyTeamId) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/${studyTeamId}/cancel`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('PATCH 요청 성공:', result)
    return result
  } catch (error: any) {
    console.error('PATCH 요청 중 오류 발생:', error.message)
    throw error
  }
}

//스터디 공고 마감
export const handleCloseStudy = async (studyTeamId) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/close/${studyTeamId}`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('스터디 마감 성공:', result)
    return result
  } catch (error: any) {
    console.error('스터디 마감 요청 중 오류 발생:', error.message)
    throw error
  }
}

//스터디 공고 삭제
export const deleteStudyTeam = async (projectId) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/delete/${projectId}`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('스터디 삭제 성공:', result)
    return result
  } catch (error: any) {
    console.error('스터디 삭제 요청 중 오류 발생:', error.message)
    throw error
  }
}

//스터디 지원자 보기
export const getStudyApplicants = async (studyTeamId) => {
  try {
    const response = await fetch(
      `/api/v1/studyTeams/${studyTeamId}/applicants`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('스터디 신청자 목록 조회 성공:', result)
    return result
  } catch (error: any) {
    console.error('스터디 신청자 목록 조회 중 오류 발생:', error.message)
    throw error
  }
}
 
// 스터디 지원자 수락
export const acceptStudyApplicant = async (data) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/applicants/accept`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('스터디 지원 수락 성공:', result)
    return result
  } catch (error: any) {
    console.error('스터디 지원 수락 중 오류 발생:', error.message)
    throw error
  }
}

// 스터디 지원 거부
export const denyStudyApplicant = async (data) => {
  try {
    const response = await fetch(`/api/v1/studyTeams/applicants/reject`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('스터디 지원 거절 성공:', result)
    return result
  } catch (error: any) {
    console.error('스터디 지원 거절 중 오류 발생:', error.message)
    throw error
  }
}
