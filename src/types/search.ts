export interface Project {
  id: string
  index: string
  name: string
  title: string
  projectExplain: string
  mainImages: string[]
  teamStacks: string[]
  score: number
}

export interface Study {
  id: string
  index: string
  mainImages: string[]
  name: string
  score: number
  studyExplain: string
  title: string
}

export interface Blog {
  id: string
  title: string
  url: string
  date: string
  userID: string
  userName: string
  userProfileImage: string
  thumbnail: string
  stack: string[]
}

export interface Resume {
  id: number
  title: string
  url: string
  createdAt: number
  userName: string
  year: string
  position: string
}

export interface Session {
  id: string
  userId: string
  thumbnail: string
  title: string
  presenter: string
  date: string
  category: string
  user: {
    name: string
    profileImage: string
  }
}

export type SearchResults = {
  project: ProjectTeam[]
  study: StudyTeam[]
  blog: Blog[]
  resume: Resume[]
  session: Session[]
}

export interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

export interface ProjectTeam extends TeamBase {
  index: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages?: string[]
  teamStacks: {
    stackName: string
    isMain: boolean
  }[]
}

export interface StudyTeam extends TeamBase {
  index: 'study'
  recruitNum: number
  studyExplain: string
}

export type Team = ProjectTeam | StudyTeam

export interface TeamsResponse {
  allTeams: Team[]
}

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
}
