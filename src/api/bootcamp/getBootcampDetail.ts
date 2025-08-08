export const getBootcampDetail = async (bootcampId: number) => {
  const res = await fetch(`/bootcamps/${bootcampId}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('부트캠프 상세정보를 불러오지 못했습니다.')
  return res.json()
}
