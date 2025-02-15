export const fetchResumeById = async (resumeId: number): Promise<any> => {
  try {
    const response = await fetch(`/api/v1/resumes/${resumeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resume with id ${resumeId}. Status: ${response.status}`,
      )
    }

    const result = await response.json()
    console.log(result.data)
    // API 응답 구조에 따라 `data` 반환
    return result.data
  } catch (error: any) {
    console.error('이력서 단일 조회 실패:', error.message)
    throw error
  }
}
