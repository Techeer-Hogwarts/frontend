export const updateBootcamp = async (
  bootcampId: number,
  data: {
    name: string
    team: string
    projectExplain: string
    githubUrl: string
    mediumUrl: string
    webUrl: string
    imageUrl: File | string | Blob
    members: {
      userId: number
      position: string
      isLeader: boolean
    }[]
  },
) => {
  const formData = new FormData()

  const requestPayload = {
    name: data.name,
    team: data.team,
    projectExplain: data.projectExplain,
    githubUrl: data.githubUrl,
    mediumUrl: data.mediumUrl,
    webUrl: data.webUrl,
    members: data.members,
  }

  formData.append('request', JSON.stringify(requestPayload))

  if (data.imageUrl) {
    formData.append('image', data.imageUrl)
  }

  const res = await fetch(`/bootcamps/${bootcampId}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  })

  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || '수정 실패')
  }

  return res.json()
}
