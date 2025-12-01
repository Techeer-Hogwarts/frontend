// 스터디 추가하기
export const handleAddStudy = async (data: any) => {
  try {
    const response = await fetch(`/api/studyTeams`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })

    if (response.ok) {
      const result = await response.json()
      return result
    }
  } catch (error: any) {
    throw error
  }
}

// 스터디 수정하기
export const handleEditStudy = async (data: any, projectId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/${projectId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: data,
    })

    if (!response.ok) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

// 스터디 상세 페이지 가져오기
export const getStudyDetail = async (studyTeamId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/${studyTeamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

// 스터디 참여 멤버 가져오기
export const getStudyMember = async (studyTeamId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/${studyTeamId}/members`, {
      method: 'GET',
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

// 스터디 지원하기
export const handleApplyStudy = async (data: any) => {
  try {
    const response = await fetch(`/api/studyTeams/apply`, {
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

    return response
  } catch (error: any) {
    throw error
  }
}

// 스터디 지원 취소하기
export const handleDenyStudy = async (studyTeamId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/${studyTeamId}/cancel`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    return response
  } catch (error: any) {
    throw error
  }
}

//스터디 공고 마감
export const handleCloseStudy = async (studyTeamId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/close/${studyTeamId}`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    return response
  } catch (error: any) {
    throw error
  }
}

//스터디 공고 삭제
export const deleteStudyTeam = async (projectId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/delete/${projectId}`, {
      method: 'PATCH',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    return response
  } catch (error: any) {
    throw error
  }
}

//스터디 지원자 보기
export const getStudyApplicants = async (studyTeamId: number) => {
  try {
    const response = await fetch(`/api/studyTeams/${studyTeamId}/applicants`, {
      method: 'GET',
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

// 스터디 지원자 수락
export const acceptStudyApplicant = async (data: any) => {
  try {
    const response = await fetch(`/api/studyTeams/applicants/accept`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    return response
  } catch (error: any) {
    throw error
  }
}

// 스터디 지원 거부
export const denyStudyApplicant = async (data: any) => {
  try {
    const response = await fetch(`/api/studyTeams/applicants/reject`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    return response
  } catch (error: any) {
    throw error
  }
}
