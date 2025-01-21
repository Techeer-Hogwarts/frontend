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
    console.log('POST 요청 성공:', result)
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
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error('스터디 상세 가져오기 중 오류 발생:', error.message)
    throw error
  }
}
