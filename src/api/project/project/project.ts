// 프로젝트 공고 생성 (multipart/form-data)
// handleAddProject.ts
export const handleAddProject = async (data: any) => {
  try {
    const formData = new FormData()

    // 1) 메인 이미지 (파일 1개) - mainImage 필드로 전송
    if (data.mainImage) {
      formData.append('mainImage', data.mainImage)
    }

    // 2) 결과 이미지들 (여러 개) - resultImages 필드로 전송
    if (data.resultImages && Array.isArray(data.resultImages)) {
      data.resultImages.forEach((file: File) => {
        formData.append('resultImages', file)
      })
    }

    // 3) JSON 데이터 준비 (이미지 제외)
    const { mainImage, resultImages, ...rest } = data

    // projectMember 데이터 정리 (스터디와 동일하게)
    const cleanedProjectData = {
      ...rest,
      projectMember:
        rest.projectMember?.map((member) => ({
          userId: member.userId || member.id,
          isLeader: member.isLeader,
          teamRole: member.teamRole,
        })) || [],
    }

    // JSON을 Blob으로 변환하여 FormData에 추가
    const json = new Blob([JSON.stringify(cleanedProjectData)], {
      type: 'application/json',
    })
    formData.append('createProjectTeamRequest', json)

    const response = await fetch('/api/projectTeams', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `POST 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

// 프로젝트 상세 조회
export const getProjectDetail = async (projectTeamId) => {
  try {
    const response = await fetch(`/api/projectTeams/${projectTeamId}`, {
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

// 프로젝트 참여 멤버 가져오기
export const getProjectMember = async (projectTeamId) => {
  try {
    const response = await fetch(`/api/projectTeams/${projectTeamId}/members`, {
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

//프로젝트 지원자 보기
export const getProjectApplicants = async (projectTeamId) => {
  try {
    const response = await fetch(
      `/api/projectTeams/${projectTeamId}/applicants`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

// 프로젝트 수정하기
export const handleEditProject = async (projectId: number, data: any) => {
  try {
    const formData = new FormData()

    // 1) 메인 이미지 (파일 1개) - 새로 업로드된 경우만
    if (data.mainImage) {
      formData.append('mainImage', data.mainImage)
    }

    // 2) 결과 이미지 (여러 개) - 새로 업로드된 것만
    if (data.resultImages && Array.isArray(data.resultImages)) {
      data.resultImages.forEach((file: File) => {
        formData.append('resultImages', file)
      })
    }

    // 3) JSON 직렬화
    const { mainImage, resultImages, ...rest } = data
    const json = new Blob([JSON.stringify(rest)], {
      type: 'application/json',
    })
    formData.append('updateProjectTeamRequest', json)

    // 4) PATCH 전송
    const response = await fetch(`/api/projectTeams/${projectId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData, // multipart/form-data
    })

    if (!response.ok) {
      throw new Error(`PATCH 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

//프로젝트 공고 마감
export const handleCloseProject = async (projectTeamId) => {
  try {
    const response = await fetch(`/api/projectTeams/close/${projectTeamId}`, {
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

//프로젝트 공고 삭제
export const deleteProjectTeam = async (projectId) => {
  try {
    const response = await fetch(`/api/projectTeams/delete/${projectId}`, {
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

// 프로젝트 지원하기
export const handleApplyProject = async (data) => {
  try {
    const response = await fetch(`/api/projectTeams/apply`, {
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

// 프로젝트 지원 취소하기
export const handleDenyProject = async (projectId) => {
  try {
    const response = await fetch(`/api/projectTeams/${projectId}/cancel`, {
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

// 프로젝트 지원자 수락
export const acceptProjectApplicant = async (data) => {
  try {
    const response = await fetch(`/api/projectTeams/accept`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
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

// 프로젝트 지원 거부
export const denyProjectApplicant = async (data) => {
  try {
    const response = await fetch(`/api/projectTeams/reject`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
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

//스택 조회
export async function getStacks() {
  const response = await fetch('/api/stacks', {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`스택 조회 실패: ${response.status}`)
  }
  const data = await response.json()
  return data
}
