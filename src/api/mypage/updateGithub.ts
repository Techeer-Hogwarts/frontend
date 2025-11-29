export const updateGithub = async (githubUrl: string) => {
  const response = await fetch('/api/users/github/username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ githubUrl }),
  })

  if (!response.ok) {
    // 응답이 JSON인지 확인
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `GitHub 동기화 실패: ${response.status}`,
      )
    } else {
      // JSON이 아닌 경우 텍스트로 읽기
      const errorText = await response.text()
      throw new Error(errorText || `GitHub 동기화 실패: ${response.status}`)
    }
  }

  // 성공 응답도 JSON인지 확인
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  } else {
    return { message: await response.text() }
  }
}
