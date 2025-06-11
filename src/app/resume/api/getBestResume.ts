export const fetchBestResumes = async (
  offset: number,
  limit: number,
  setAuthModalOpen: (open: boolean) => void,
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/v3/resumes/best?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    // 401 Unauthorized 응답 처리
    if (response.status === 401) {
      setAuthModalOpen(true) // ✅ 로그인 필요 → AuthModal 열기
      throw new Error('로그인이 필요합니다.') // 오류 던지기 (try-catch로 감지)
    }

    if (!response.ok) {
      throw new Error(`인기 이력서 조회 실패: ${response.status}`)
    }

    const result = await response.json()
    const dataWithWrapper = { data: result } // Back에서 data 필드 없시 바로 반환하기 때문에

    return dataWithWrapper
  } catch (error: any) {
    throw error
  }
}
