export const upgradeTecheer = async (formData: FormData) => {
  const response = await fetch(`/api/users/techeer`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    if (errorData?.errors) {
      // 필드별 에러 메시지가 있는 경우
      const fieldErrors = Object.values(errorData.errors).join('\n')
      const error = new Error(fieldErrors)
      ;(error as any).status = response.status
      ;(error as any).errors = errorData.errors
      throw error
    }

    // 일반 에러 메시지
    const error = new Error(errorData?.message || '테커 전환에 실패했습니다.')
    ;(error as any).status = response.status
    throw error
  }

  // 성공 응답 처리 - JSON이 있으면 파싱하고, 없으면 빈 객체 반환
  try {
    const text = await response.text()
    return text ? JSON.parse(text) : {}
  } catch (error) {
    // JSON 파싱 실패시 빈 객체 반환
    return {}
  }
}
