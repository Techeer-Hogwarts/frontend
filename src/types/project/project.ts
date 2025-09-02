/** TapBar 옵션 */
export type TabOption = '전체보기' | '프로젝트' | '스터디'

/** 정렬 드롭다운 옵션 */
export type SortOption = '최신 순' | '조회수 순' | '좋아요 순'

/** 모집여부 드롭다운 옵션 */
export type RecruitmentOption = '모집 중' | '모집 완료'

/** 진행여부 드롭다운 옵션 */
export type ProgressOption = '진행 중' | '진행 완료'

/** 포지션 드롭다운 옵션 (API에 그대로 전달할 값) */
export type PositionOption =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DEVOPS'
  | 'FULLSTACK'
  | 'DATA_ENGINEER'

//프로젝트 페이지 불러오기
export interface GetAllTeamsFilter {
  // 커서 기반 페이지네이션 필드
  id?: number // 커서 보조키
  dateCursor?: string // UPDATE_AT_DESC용 커서
  countCursor?: number // VIEW_COUNT_DESC용 커서

  // 기본 조회 옵션
  limit?: number // 기본값: 10
  sortType?: 'UPDATE_AT_DESC' | 'VIEW_COUNT_DESC' // 기본값: UPDATE_AT_DESC

  // 필터링 옵션 (null이면 모든 팀 포함)
  teamTypes?: ('PROJECT' | 'STUDY')[]
  positions?: (
    | 'FRONTEND'
    | 'BACKEND'
    | 'DEVOPS'
    | 'FULLSTACK'
    | 'DATA_ENGINEER'
  )[]
  isRecruited?: boolean | null
  isFinished?: boolean | null
}

/** API 호출용 filter */
export interface TeamFilter {
  teamTypes?: ('PROJECT' | 'STUDY')[]
  positions?: string[] // 프론트엔드에서는 기존 형식 유지
  isRecruited?: boolean
  isFinished?: boolean
  limit?: number
  sortType?: 'UPDATE_AT_DESC' | 'VIEW_COUNT_DESC'
}

/** API 응답 형태 */
export interface TeamsResponse {
  allTeams: Team[]
  nextInfo?: {
    countCursor: number | null
    dateCursor: string
    hasNext: boolean // 다음 페이지 존재 여부
    id: number
    sortType: string
  }
}

/** 공통 기본 필드 */
export interface TeamBase {
  id: number
  deleted: boolean
  recruited: boolean
  finished: boolean
  name: string
  createdAt: string
}

/** 프로젝트 팀 상세 */
export interface ProjectTeam extends TeamBase {
  type: 'PROJECT'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages?: string[]
  teamStacks: { stack: string; isMain: boolean }[]
}

/** 스터디 팀 상세 */
export interface StudyTeam extends TeamBase {
  type: 'STUDY'
  recruitNum: number
  studyExplain: string
}

/** 합쳐진 팀 타입 */
export type Team = ProjectTeam | StudyTeam

export interface ProjectTeam {
  id: number
  name: string
  resultImages: string[]
}

export interface Experience {
  id: number
  position: string
  companyName: string
  startDate: string
  endDate: string | null
  category: string
  isFinished: boolean
}

export interface UserProfile {
  id: number
  profileImage: string
  name: string
  nickname: string
  email: string
  school: string
  grade: string
  mainPosition: string
  subPosition: string
  githubUrl: string | null
  mediumUrl: string | null
  velogUrl: string | null
  tistoryUrl: string | null
  isLft: boolean
  year: number
  stack: string[]
  projectTeams: ProjectTeam[]
  experiences: Experience[]
}

export interface ProjectData {
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
  projectMember: any[]
  teamStacks: any[]
  mainImage: File | null
  resultImages: File[]
}

export interface StudyData {
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
  studyMember: any[]
  resultImages: File[]
}

export interface Applicant {
  id: number
  userId?: number
  name: string
  isLeader: boolean
  teamRole: string
  summary: string
  status: string
  profileImage: string
  year: number | string
}

export type ModalType = 'delete' | 'close' | 'cancel' | null

export interface DetailPageProps {
  params: Promise<{
    id: string
  }>
}
