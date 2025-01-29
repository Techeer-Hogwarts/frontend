export async function getProfileList({
  position,
  year,
  university,
  grade,
  offset = 0,
  limit = 10,
}: {
  position?: string
  year?: number
  university?: string
  grade?: string
  offset?: number
  limit?: number
}) {
  try {
    // 조건이 있는 값들만 포함한 객체 생성
    const params = {
      ...(position && { position }),
      ...(year && { year: year.toString() }),
      ...(university && { university }),
      ...(grade && { grade }),
      offset: offset.toString(),
      limit: limit.toString(),
    }

    const url = `/api/v1/users/profiles?${new URLSearchParams(params).toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: 프로필 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    return (await response.json())?.data || []
  } catch (error) {
    console.error('프로필 목록 조회 실패:', error)
    throw error
  }
}
