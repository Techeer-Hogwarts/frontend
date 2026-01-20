export const getBootcampYear = async () => {
  const res = await fetch('/api/bootcamps/bootcampYear', {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('부트캠프 기수를 불러오지 못했습니다.')
  }

  return res.json()
}
