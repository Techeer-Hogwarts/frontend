interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
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
  teamStacks: { stackName: string; isMain: boolean }[]
}

export interface StudyTeam extends TeamBase {
  index: 'study'
  recruitNum: number
  studyExplain: string
}

type Team = ProjectTeam | StudyTeam

interface TeamsResponse {
  allTeams: Team[]
}

export interface ResumeProps {
  id: number
  title: string
  url: string
  createdAt: number
  userName: string
  year: string
  position: string
}

export interface BlogProps {
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

export interface SessionProps {
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
