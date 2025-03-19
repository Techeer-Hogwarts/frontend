const loginUser = async (data) => {
  const response = await fetch('api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || '로그인 실패')
  }

  return response.json
}
