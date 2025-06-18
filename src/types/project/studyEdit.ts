// types/studyEdit.ts
export interface EditStudyMember {
  id: number
  name: string
  isDeleted: boolean
  isLeader: boolean
  studyTeamId: number
  userId: number
  email: string
  [key: string]: any
}

export interface EditStudyData {
  name: string
  githubLink: string
  notionLink: string
  studyExplain: string
  goal: string
  rule: string
  isFinished: boolean
  isRecruited: boolean
  recruitNum: number
  recruitExplain: string
  studyMember: EditStudyMember[]
  resultImages: File[]
  deleteImages: string[]
}

export interface DeletedStudyMember {
  id: number
  userId?: number
}

export interface ExistingStudyImage {
  id: number
  imageUrl: string
}

export interface EditStudyFormData {
  name: string
  githubLink: string
  notionLink: string
  studyExplain: string
  goal: string
  rule: string
  isFinished: boolean
  isRecruited: boolean
  recruitNum: number
  recruitExplain: string
  studyMember: {
    userId: number
    isLeader: boolean
  }[]
  deleteImages: number[]
  deleteMembers: number[]
}

export interface EditStudyPageProps {
  params: {
    id: string
  }
}
