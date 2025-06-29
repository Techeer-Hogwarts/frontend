interface GetBootcampMembersResponse {
  profiles: { id: number; name: string }[]
  hasNext: boolean
  nextCursor: number | null
}

export const getBootcampMembers =
  async (): Promise<GetBootcampMembersResponse> => {
    const res = await fetch('/api/v1/users/profiles/bootcampMember', {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('부트캠프 멤버 정보를 불러오지 못했습니다.')
    }

    return res.json()
  }
