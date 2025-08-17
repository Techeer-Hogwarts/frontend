import {
  TodayCsResponse,
  CsProblemListParams,
  CsProblemListResponse,
  CsProblemDetail,
} from './types'

const CS_API_BASE = '/api/today-cs'

// 최신 CS 문제 조회
export const getTodayCs = async (): Promise<TodayCsResponse> => {
  const response = await fetch(`${CS_API_BASE}/today`)

  if (!response.ok) {
    throw new Error('오늘의 CS 문제를 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 문제 목록 조회
export const getCsProblemList = async (
  params: CsProblemListParams,
): Promise<CsProblemListResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.append('cursor', params.cursor.toString())
  if (params.size) searchParams.append('size', params.size.toString())

  const url = `${CS_API_BASE}/problems${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('CS 문제 목록을 불러오는데 실패했습니다.')
  }

  return response.json()
}

// CS 문제 상세 조회
export const getCsProblemDetail = async (
  problemId: number,
): Promise<CsProblemDetail> => {
  const response = await fetch(`${CS_API_BASE}/problems/${problemId}`)

  if (!response.ok) {
    throw new Error('CS 문제 상세 정보를 불러오는데 실패했습니다.')
  }

  return response.json()
}
