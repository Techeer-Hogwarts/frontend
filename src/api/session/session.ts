import { SessionFormData } from '@/types/\bsession/session'

// 세션 데이터 삭제
export const deleteSession = async (id: string) => {
  const response = await fetch(`/api/v1/sessions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (response.status === 403) {
    alert('본인이 작성한 게시물만 삭제할 수 있습니다.')
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }

  if (!response.ok) {
    throw new Error('세션 데이터를 삭제하는데 실패했습니다.')
  }
}

// 세션 금주의 데이터 조회
export const getBestSessions = async (limit: number) => {
  const response = await fetch(
    `/api/v1/sessions/best?offset=0&limit=${limit}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )

  if (!response.ok) {
    throw new Error('금주의 세션 데이터를 가져오는 데 실패했습니다.')
  }

  return response.json()
}

// 세션 데이터 조회
export const getSessions = async (
  category: string,
  newLimit: number,
  date: string[],
  position: string[],
  setAuthModalOpen: any,
) => {
  const baseUrl = '/api/v1/sessions'
  const params = {
    category,
    offset: '0',
    limit: String(newLimit),
  }

  // 파라미터 생성
  const searchParams = new URLSearchParams(params)
  date.forEach((d) => searchParams.append('date', d))
  position.forEach((p) => searchParams.append('position', p))
  const url = `${baseUrl}?${searchParams.toString()}`

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
  if (response.status == 401) {
    setAuthModalOpen(true)
    throw new Error('세션 데이터를 가져오는 데 실패했습니다.')
  }
  if (!response.ok) {
    throw new Error('세션 데이터를 가져오는 데 실패했습니다.')
  }
  return response.json()
}

// 개별 세션 데이터 조회
export const getSingleSession = async (id: string) => {
  const response = await fetch(`/api/v1/sessions/${id}`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('단일 세션 데이터를 가져오는 데 실패했습니다.')
  }
  const result = await response.json()
  return result
}

// 세션 데이터 수정
export const updateSession = async (data: {
  id: string
  payload: SessionFormData
}) => {
  const response = await fetch(`/api/v1/sessions/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data.payload),
  })

  if (response.status === 403) {
    throw new Error('본인이 작성한 게시물만 수정할 수 있습니다.')
  }
  if (!response.ok) {
    throw new Error('세션 데이터를 수정하는 데 실패했습니다.')
  }

  return response.json()
}

// 세션 데이터 업로드
export const postSession = async (data: SessionFormData) => {
  const response = await fetch('/api/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
  }
  return response.json()
}
