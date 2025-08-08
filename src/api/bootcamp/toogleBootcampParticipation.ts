export const toogleBootcampParticipation = async () => {
  const res = await fetch(`/bootcamps/rejoin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    credentials: 'include',
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || '부트캠프 참여 토글 실패')
  }

  return
}
