export const deleteSession = async (id: string) => {
  const response = await fetch(
    `https://api.techeerzip.cloud/api/v1/sessions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  )
  if (!response.ok) {
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }
  const result = await response.json()
  return result.data
}
