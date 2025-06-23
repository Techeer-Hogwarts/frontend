export type BootcampMemberType = {
  userId: number
  name?: string
  position: string
  isLeader: boolean
}

export type BootcampType = {
  id: number
  year: number
  imageUrl: string
  rank: number
}

export type BootcampDetailType = {
  id: number
  name: string
  team: string
  year: number
  projectExplain: string
  githubUrl: string
  mediumUrl: string
  webUrl: string
  imageUrl: string
  isOpen: boolean
  rank: number
  members: BootcampMemberType[]
}
