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

export interface StackItem {
  id: number
  name: string
  category: string
}

export interface TechStacks {
  backend?: StackItem[]
  frontend?: StackItem[]
  database?: StackItem[]
  devops?: StackItem[]
  other?: StackItem[]
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
  techStacks?: TechStacks
}

export interface GetProfileImageRequest {
  email: string
}

export interface GetProfileImageResponse {
  profileImage: string
}

// Experience 타입에 experienceId 필드 추가
export type UpdateExperienceRequest = Omit<Experience, 'id'> & {
  experienceId?: number
}

// ProfileData에서 필요한 필드만 추출
export type UpdateProfileRequest = Pick<ProfileData, 
  'year' | 'isLft' | 'school' | 'grade' | 'mainPosition' | 'subPosition' | 'githubUrl' | 'mediumUrl' | 'velogUrl' | 'tistoryUrl'
>

export interface UpdateProfilePayload {
  updateRequest: UpdateProfileRequest
  experienceRequest: {
    experiences: UpdateExperienceRequest[]
  }
}
