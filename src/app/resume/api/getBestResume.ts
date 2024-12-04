export const fetchBestResumes = async (
  offset: number,
  limit: number,
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/v1/resumes/best?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`인기 이력서 조회 실패: ${response.status}`)
    }

    const result = await response.json()
    console.log('인기 이력서 조회 성공', result.data)
    return result.data
  } catch (error: any) {
    console.error('Error fetching best resumes:', error.message)
    throw error
  }
}
