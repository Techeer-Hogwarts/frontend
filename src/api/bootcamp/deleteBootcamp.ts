export const deleteBootcamp = async (bootcampId: number) => {
  const res = await fetch(`/api/v1/bootcamps/${bootcampId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('삭제 실패')
  }
}
