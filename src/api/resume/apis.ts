import {
  ResumeQueryParams,
  ResumeDetail,
  BestResumeResponse,
  UserResumeResponse,
  LikeBookmarkRequest,
  ResumeUploadRequest,
} from './types'

const RESUME_API_BASE = '/api/resumes'

// 이력서 목록 조회
export async function getResumeList({
  position = [],
  year = [],
  category = '전체',
  cursorId,
  limit = 10,
  sortBy = 'CREATEDAT',
}: ResumeQueryParams) {
  try {
    // URLSearchParams를 사용하여 동적으로 쿼리 문자열 생성
    const params = new URLSearchParams()

    if (position.length > 0)
      position.forEach((p) => params.append('position', p))
    if (year.length > 0) year.forEach((y) => params.append('year', y))
    // 카테고리 변환 (한글 -> 영어)
    const categoryMap: { [key: string]: string } = {
      전체: '',
      이력서: 'RESUME',
      포트폴리오: 'PORTFOLIO',
      ICT: 'ICT',
      OTHER: 'OTHER',
    }

    // category가 undefined이거나 null일 때 기본값 처리
    const safeCategory = category || '전체'
    const mappedCategory = categoryMap[safeCategory] || ''

    // 카테고리가 빈 문자열이 아닐 때만 파라미터에 추가
    if (mappedCategory) {
      params.append('category', mappedCategory)
    }

    if (cursorId != undefined) {
      params.append('cursorId', cursorId.toString())
    }
    params.append('limit', limit.toString())
    params.append('sortBy', sortBy)

    const response = await fetch(`${RESUME_API_BASE}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: 이력서 목록 조회 실패: ${response.status} ${response.statusText}`,
      )
    }

    const result = await response.json()
    return result
  } catch (error) {
    throw error // 에러를 호출한 함수에 다시 전달
  }
}

// 이력서 상세 조회
export const fetchResumeById = async (
  resumeId: number,
): Promise<ResumeDetail> => {
  try {
    const response = await fetch(`${RESUME_API_BASE}/${resumeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resume with id ${resumeId}. Status: ${response.status}`,
      )
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

// 인기 이력서 조회
export const fetchBestResumes = async (
  cursorId?: number,
  limit: number = 12,
  setAuthModalOpen?: (open: boolean) => void,
): Promise<BestResumeResponse> => {
  try {
    const params = new URLSearchParams()
    params.append('limit', String(limit))

    if (typeof cursorId === 'number') {
      params.append('cursorId', String(cursorId))
    }

    const response = await fetch(
      `${RESUME_API_BASE}/best?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    // 401 Unauthorized 응답 처리
    if (response.status === 401) {
      setAuthModalOpen?.(true)
      throw new Error('로그인이 필요합니다.')
    }

    if (!response.ok) {
      throw new Error(`인기 이력서 조회 실패: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    throw error
  }
}

// 사용자 이력서 목록 조회
export const fetchUserResumes = async (
  userId: number,
  cursor?: number,
  limit: number = 10,
): Promise<UserResumeResponse> => {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams()
    if (cursor !== undefined) {
      params.append('cursor', cursor.toString())
    }
    params.append('limit', limit.toString())

    const queryString = params.toString()
    const url = `${RESUME_API_BASE}/user/${userId}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resumes for user. Status: ${response.status}`,
      )
    }

    const result = await response.json()
    return result // 새로운 API 응답 구조 그대로 반환
  } catch (error: any) {
    throw error
  }
}

// 북마크 처리
export const postBookmark = async (
  data: LikeBookmarkRequest,
): Promise<void> => {
  const response = await fetch('/api/bookmarks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contentId: data.contentId,
      category: data.category,
      bookmarkStatus: data.bookmarkStatus,
    }),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('북마크 처리 중 오류가 발생했습니다.')
  }
}

// 이력서 업로드
export const uploadResume = async (
  file: File,
  data: ResumeUploadRequest,
): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('request', JSON.stringify(data))

  const response = await fetch(RESUME_API_BASE, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    if (response.status === 400) {
      throw new Error('존재하지 않는 카테고리입니다.')
    }

    if (response.status === 401) {
      throw new Error(errorData?.message || '로그인이 필요합니다.')
    }

    throw new Error(`이력서 업로드 실패: ${response.status}`)
  }

  return response.json()
}
