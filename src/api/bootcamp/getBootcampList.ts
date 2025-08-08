interface GetBootcampListParams {
  isAward?: boolean
  year?: number
  cursorId?: number
  limit?: number
}

export const getBootcampList = async ({
  isAward,
  year,
  cursorId = 0,
  limit = 10,
}: GetBootcampListParams) => {
  const params = new URLSearchParams()

  params.append('isAward', String(isAward))
  if (year !== undefined) params.append('year', String(year))
  if (cursorId !== undefined) params.append('cursorId', String(cursorId))
  params.append('limit', String(limit))

  const res = await fetch(`/bootcamps?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('부트캠프 리스트를 불러오지 못했습니다.')

  return res.json()
}
