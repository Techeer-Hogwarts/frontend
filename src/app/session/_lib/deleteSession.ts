export const deleteSession = async (id: string) => {
  const response = await fetch(`/api/v1/sessions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (response.status === 403) {
    alert('본인이 작성한 게시물만 삭제할 수 있습니다.')
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }

  if (!response.ok) {
    const errorDetails = await response.text()
    console.error('서버 오류 응답:', errorDetails)
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }

  if (response.status === 204) {
    return {}
  }
  try {
    const result = await response.json()
    return result
  } catch (error) {
    console.error('응답 본문 JSON 파싱 오류:', error)
    return {} // JSON 파싱 오류 발생 시 빈 객체 반환
  }
}
