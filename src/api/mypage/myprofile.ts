export const fetchUserProfile = async () => {
  const response = await fetch(`/users`, {
    method: 'GET',
    credentials: 'include',
  })

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message || `유저 정보를 불러오지 못했습니다.`)
  }

  return response.json()
}
