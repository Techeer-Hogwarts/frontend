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
  if (response.status == 403) {
    alert('본인이 작성한 게시물만 삭제할 수 있습니다.')
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }
  if (!response.ok) {
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }

  const result = await response.json()
  return result.data
}
