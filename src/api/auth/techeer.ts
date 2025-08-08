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

  return await response.json()
}
