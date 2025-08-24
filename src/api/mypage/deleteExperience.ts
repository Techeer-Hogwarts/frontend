export const deleteExperience = async (experienceId: number) => {
  const response = await fetch(`/api/users/experience/${experienceId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message || `경력 삭제 실패: ${response.status}`)
  }

  return response
}
