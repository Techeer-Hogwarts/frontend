export default async function getCurrentUser() {
  const res = await fetch('/api/users', {
    method: 'GET',
    credentials: 'include', //사용자 식별, 로그인 확인
  })

  if (!res.ok) {
    throw new Error('사용자 정보를 불러오는 데 실패했습니다.')
  }

  return res.json()
}
