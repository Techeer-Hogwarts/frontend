// 블로그 포스트 타입
export interface BlogPost {
  id: number
  title: string
  url: string
  date: string
  category: string
  createdAt: string
  likeCount: number
  viewCount: number
  thumbnail: string
  author: {
    authorName: string
    authorImage: string
  }
  user: {
    id: number
    name: string
    profileImage: string
  }
}

export interface BlogApiResponse {
  data: BlogPost[]
  hasNext: boolean
  nextCursor: number
}

export interface BlogQueryParams {
  category?: string
  cursorId?: number
  limit: number
  sortBy?: 'latest' | 'viewCount' | 'name'
}

// 이력서 타입
export interface Resume {
  id: string
  createdAt: number
  title: string
  category: string
  position: string
  likeCount: number
  year: string
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
  likeList: string[]
  bookmarkList: string[]
}

export interface ResumeApiResponse {
  data: Resume[]
  hasNext: boolean
  nextCursor: number
}

export interface ResumeQueryParams {
  position?: string[]
  year?: number[]
  category?: string
  sortBy?: 'CREATEDAT' | 'VIEWCOUNT'
  cursorId?: number
  limit: number
}

// 프로젝트 타입
export interface Project {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages: string[]
  teamStacks: Array<{
    stackName: string
    isMain: boolean
  }>
}

// API에서 받는 프로젝트/스터디 팀 타입
export interface ProjectStudyTeam {
  id: number
  name: string
  projectExplain?: string
  studyExplain?: string
  recruitNum?: number
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  viewCount: number
  likeCount: number
  mainImages: string[]
  teamStacks: Array<{
    stack: string
    isMain: boolean
  }>
  createdAt: string
  updatedAt: string
  type: 'PROJECT' | 'STUDY'
  isRecruited: boolean
  deleted: boolean
  finished: boolean
  recruited: boolean
}

// 스터디 타입
export interface Study {
  id: number
  name: string
  isRecruited: boolean
  isFinished: boolean
  studyExplain: string
  recruitNum: number
}

// 일정 타입
export interface Schedule {
  id: number
  day: number
  title: string
  org: string
  date: string
  url?: string
}

// 명예의 전당 멤버 타입
export interface HallOfFameMember {
  id: number
  name: string
  email: string
  school: string
  status: string
  generation: string
  mainPosition: string
  profileImage: string
}

// 홈 페이지 데이터 타입
export interface HomePageData {
  blogs: BlogPost[]
  resumes: Resume[]
  projects: Project[]
  studies: Study[]
  schedules: Schedule[]
  hallOfFameMembers: {
    techer: HallOfFameMember
    grass: HallOfFameMember
    blogger: HallOfFameMember
  }
}

export interface RankingUser {
  user: {
    id?: number
    profileImage: string
    name: string
    nickname?: string | null
    email?: string
    githubUrl?: string | null
    mediumUrl?: string | null
    tistoryUrl?: string | null
    velogUrl?: string | null
    mainPosition?: string
    school?: string
    grade?: string
    year?: number
  }
  count: number
}

export interface BlogRanking {
  year: number
  month: number
  users: RankingUser[]
}

export interface GitContributionRanking {
  year: number
  month: number
  users: RankingUser[]
}

export interface ZoomRanking {
  userId: number
  userName: string
  email: string
  profileImage: string
  totalMinutes: number
  totalHours: number
  attendanceDays: number
  year: number
  month: number
}

export interface RankingData {
  blogRanking: BlogRanking
  gitContributionRanking: GitContributionRanking
  zoomRanking: ZoomRanking
}

export interface CSProblem {
  problemId: number
  content: string
  isAnswered: boolean
}
