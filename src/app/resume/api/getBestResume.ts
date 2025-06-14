export const fetchBestResumes = async (
  cursorId: number,
  limit: number,
  setAuthModalOpen: (open: boolean) => void,
): Promise<any> => {
  try {
    const params = new URLSearchParams()
    params.append('limit', String(limit))

    if (typeof cursorId === 'number') {
      params.append('cursorId', String(cursorId))
    }

     const response = await fetch(`/api/v1/resumes/best?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 401 Unauthorized 응답 처리
    if (response.status === 401) {
      setAuthModalOpen(true)
      throw new Error('로그인이 필요합니다.')
    }

    if (!response.ok) {
      throw new Error(`인기 이력서 조회 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}
