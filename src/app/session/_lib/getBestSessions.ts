export const getBestSessions = async (limit: number) => {
  const response = await fetch(
    `/api/v1/sessions/best?offset=0&limit=${limit}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )

  if (response.status == 401) {
    throw new Error('금주의 세션 데이터를 가져오는 데 실패했습니다.')
  }
  if (!response.ok) {
    throw new Error('금주의 세션 데이터를 가져오는 데 실패했습니다.')
  }
  const result = await response.json()
  return result
}
