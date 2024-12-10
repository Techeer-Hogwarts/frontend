export async function fetchResumes(
  position: string,
  year: number,
  offset: number,
  limit: number,
) {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.techeerzip.cloud'
  const url = new URL('/api/v1/resumes', baseURL)
  const params = {
    position,
    year,
    offset,
    limit,
  }

  const response = await fetch(url.toString())
  const data = await response.json()
  console.log(data.data)

  if (data.code !== 200) {
    throw new Error('이력서 목록 조회 실패', data.message)
  }

  return data.data // 이력서 목록 반환
}
