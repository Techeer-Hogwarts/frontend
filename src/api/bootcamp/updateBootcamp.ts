export const updateBootcamp = async (
  bootcampId: number,
  data: {
    name: string
    team: string
    projectExplain: string
    githubUrl: string
    mediumUrl: string
    webUrl: string
    imageUrl: File | null
    members: {
      userId: number
      position: string
      isLeader: boolean
    }[]
  },
) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('team', data.team)
  formData.append('projectExplain', data.projectExplain)
  formData.append('githubUrl', data.githubUrl)
  formData.append('mediumUrl', data.mediumUrl)
  formData.append('webUrl', data.webUrl)
  formData.append('members', JSON.stringify(data.members))

  if (data.imageUrl) {
    formData.append('image', data.imageUrl)
  }

  const res = await fetch(`/api/v1/bootcamps/${bootcampId}`, {
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
