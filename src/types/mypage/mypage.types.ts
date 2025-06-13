export interface Experience {
  id?: number
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
  description: string | ""
}

export interface Team {
  id: number
  name: string
  resultImages?: string[]
  mainImage?: string
}

export interface ProfileData {
  id: number
  profileImage: string
  name: string
  email: string
  school: string
  grade: string
  year: number
  mainPosition: string
  subPosition: string
  githubUrl: string
  mediumUrl: string
  velogUrl: string
  tistoryUrl: string
  isLft: boolean
  projectTeams?: Team[]
  studyTeams?: Team[]
  experiences?: Experience[]
}
