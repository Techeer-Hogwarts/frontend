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
    const dataWithWrapper = { data: result } // Back에서 data 필드 없시 바로 반환하기 때문에

    // console.log('인기 이력서 조회 성공', dataWithWrapper)
    return dataWithWrapper
  } catch (error: any) {
    console.error('Error fetching best resumes:', error.message)
    throw error
  }
}
