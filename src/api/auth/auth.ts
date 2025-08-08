export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
   if (!response.ok) {
    const errorData = await response.json()
    const error = new Error(errorData.message)

    ;(error as any).status = response.status
    throw error
  }
  return await response.json()
}
