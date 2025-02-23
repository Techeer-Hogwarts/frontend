export const fetchUserResumes = async (
  userId: number,
  offset: number,
  limit: number,
): Promise<any> => {
  try {
    // URL에 userId를 경로 매개변수로 포함하고, offset과 limit은 쿼리 매개변수로 추가
    const response = await fetch(
      `/api/v1/resumes/user/${userId}?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resumes for user. Status: ${response.status}`,
      )
    }

    const result = await response.json()
    const dataWithWrapper = { data: result } // API 응답 구조에 따라 데이터 반환

    console.log('Fetched resumes:', result)
    return dataWithWrapper
  } catch (error: any) {
    console.error('Error fetching user resumes:', error.message)
    throw error
  }
}
