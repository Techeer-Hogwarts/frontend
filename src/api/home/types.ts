// 홈 페이지 관련 타입 정의

// CS 문제 관련 타입
export interface TodayCsResponse {
  problemId: number
  content: string
  isAnswered: boolean
  updatedAt: string
}

// 이벤트 관련 타입
export interface Event {
  eventId: number
  eventUrl: string
  title: string
  date: string
}

export interface RecentEventsResponse {
  events: Event[]
  hasNext: boolean
  nextCursor: number | null
}

// 프로젝트/스터디 팀 관련 타입
export interface ProjectStudyTeam {
  id: number
  name: string // title 대신 name 사용 (실제 백엔드 데이터 구조)
  content: string
  teamType: 'PROJECT' | 'STUDY'
  isRecruited: boolean
  finished: boolean
  deleted: boolean
  createdAt: string
  updatedAt: string
  stack: {
    stack: string
  }
  mainImages: string[]
  // 추가 속성들
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  studyExplain: string // 스터디 설명 속성 추가
  teamStacks: {
    stack: string
    isMain: boolean
  }[]
  recruitNum: number
}

export interface ProjectStudyTeamsResponse {
  teams: ProjectStudyTeam[]
  hasNext: boolean
  nextCursor: number | null
}

// 블로그 관련 타입
export interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface BlogListResponse {
  posts: BlogPost[]
  hasNext: boolean
  nextCursor: number | null
}

// 이력서 관련 타입
export interface Resume {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface ResumeListResponse {
  resumes: Resume[]
  hasNext: boolean
  nextCursor: number | null
}

// 랭킹 관련 타입
export interface RankingUser {
  id: number
  name: string
  email: string
  school: string
  grade: string
  year: number
  mainPosition: string
  profileImage?: string
}

export interface RankingsResponse {
  blogRanking: {
    year: number
    month: number
    users: {
      user: RankingUser
      count: number
    }[]
  }
  gitContributionRanking: {
    year: number
    month: number
    users: {
      user: RankingUser
      count: number
    }[]
  }
  zoomRanking: {
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
}

// 검색 관련 타입
export interface SearchResult {
  id: number
  title: string
  index: string
  url?: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}
