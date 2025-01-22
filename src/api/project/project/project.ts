// 프로젝트 공고 생성
export const handleAddProject = async (data) => {
  try {
    const response = await fetch('/api/v1/projectTeams', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error('POST 요청 중 오류 발생:', error.message)
    throw error
  }
}

// 프로젝트 상세 조회
export const getProjectDetail = async (projectTeamId) => {
  try {
    const response = await fetch(`/api/v1/projectTeams/${projectTeamId}`, {
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
    console.error('프로젝트 상세 가져오기 중 오류 발생:', error.message)
    throw error
  }
}

// 프로젝트 참여 멤버 가져오기
export const getProjectMember = async (projectTeamId) => {
  try {
    const response = await fetch(
      `/api/v1//projectTeams/${projectTeamId}/members`,
      {
        method: 'GET',
      },
    )
    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error('프로젝트 참여 멤버 가져오기 중 오류 발생:', error.message)
    throw error
  }
}

//프로젝트 지원자 보기
export const getProjectApplicants = async (projectTeamId) => {
  try {
    const response = await fetch(
      `/api/v1/projectTeams/${projectTeamId}/applicants`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('프로젝트 신청자 목록 조회 성공:', result)
    return result
  } catch (error: any) {
    console.error('프로젝트 신청자 목록 조회 중 오류 발생:', error.message)
    throw error
  }
}

// 프로젝트 지원자 수락
export const acceptProjectApplicant = async (data) => {
  try {
    const response = await fetch(`/api/v1/projectTeams/applicants/accept`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('프로젝트 지원 수락 성공:', result)
    return result
  } catch (error: any) {
    console.error('프로젝트 지원 수락 중 오류 발생:', error.message)
    throw error
  }
}

// 프로젝트 지원 거부
export const denyProjectApplicant = async (data) => {
  try {
    const response = await fetch(`/api/v1/projectTeams/applicants/reject`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('프로젝트 지원 거절 성공:', result)
    return result
  } catch (error: any) {
    console.error('프로젝트 지원 거절 중 오류 발생:', error.message)
    throw error
  }
}