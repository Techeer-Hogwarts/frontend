export interface EditProjectData {
  name: string
  projectExplain: string
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  isRecruited: boolean
  isFinished: boolean
  recruitExplain: string
  githubLink: string
  notionLink: string
  projectMember: EditProjectMember[]
  teamStacks: EditTeamStack[]
  mainImageFile: File | null
  resultImages: File[]
}

export interface EditProjectMember {
  id?: number
  userId: number
  name: string
  email: string
  profileImage?: string
  isLeader: boolean
  teamRole: string
  [key: string]: any
}

export interface EditTeamStack {
  stack: string
  isMain: boolean
}

export interface DeletedMember {
  id: number
  userId: number
}

export interface ExistingImage {
  id: number
  imageUrl: string
}

export interface EditProjectFormData {
  name: string
  projectExplain: string
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  isRecruited: boolean
  isFinished: boolean
  recruitExplain: string
  githubLink: string
  notionLink: string
  projectMember: {
    userId: number
    isLeader: boolean
    teamRole: string
  }[]
  teamStacks: EditTeamStack[]
  mainImageFile: File | null
  resultImages: File[]
  deleteMembers: number[]
  deleteMainImages: number[]
  deleteResultImages: number[]
}

export interface EditProjectPageProps {
  params: {
    id: string
  }
}
