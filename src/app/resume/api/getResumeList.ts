export async function fetchResumes(
  position: string,
  year: number,
  offset: number,
  limit: number,
) {
  const url = new URL('/api/v1/resumes')
  const params = {
    position,
    year: (year ?? 5).toString(), // year가 undefined이면 기본값 5
    offset: (offset ?? 0).toString(), // offset이 undefined이면 기본값 0
    limit: (limit ?? 10).toString(), // limit이 undefined이면 기본값 10
  }

  // params의 각 키와 값을 URLSearchParams에 추가
  Object.keys(params).forEach((key) => {
    const paramKey = key as keyof typeof params
    url.searchParams.append(paramKey, params[paramKey])
  })

  const response = await fetch(url.toString())
  const data = await response.json()
  console.log(data.data)

  if (data.code !== 200) {
    throw new Error('이력서 목록 조회 실패', data.message)
  }

  return data.data // 이력서 목록 반환
}
