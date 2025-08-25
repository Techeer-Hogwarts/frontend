export interface RankingUser {
  id: number
  name: string
  nickname: string | null
  profileImage: string
  email: string
  githubUrl: string
  mediumUrl: string | null
  tistoryUrl: string | null
  velogUrl: string | null
  mainPosition: string
  school: string
  grade: string
  year: number
}

export interface BlogRanking {
  user: RankingUser
  count: number
}

export interface GitContributionRanking {
  user: RankingUser
  count: number
}

export interface ZoomRanking {
  user: RankingUser
  totalMinutes: number
  totalHours: number
  attendanceDays: number
}

export interface RankingsResponse {
  blogRanking: BlogRanking
  gitContributionRanking: GitContributionRanking
  zoomRanking: ZoomRanking
}

export interface RankingsParams {
  year: number
  month: number
}

export const getRankings = async (
  params: RankingsParams,
): Promise<RankingsResponse> => {
  const { year, month } = params

  const queryParams = new URLSearchParams()
  queryParams.append('year', year.toString())
  queryParams.append('month', month.toString())

  const response = await fetch(
    `/api/v1/statistics/rankings?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(`랭킹 조회 실패: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
