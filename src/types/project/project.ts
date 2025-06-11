/** TapBar 옵션 */
export type TabOption = '전체보기' | '프로젝트' | '스터디'

/** 모집여부 드롭다운 옵션 */
export type RecruitmentOption = '모집 중' | '모집 완료'

/** 진행여부 드롭다운 옵션 */
export type ProgressOption = '진행 중' | '진행 완료'

/** 포지션 드롭다운 옵션 (API에 그대로 전달할 값) */
export type PositionOption =
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'fullstack'
  | 'dataEngineer'

/** API 호출용 filter */
export interface TeamFilter {
  teamTypes?: Array<'project' | 'study'>
  isRecruited?: boolean
  isFinished?: boolean
  positions?: PositionOption[]
}

/** 공통 기본 필드 */
export interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

/** 프로젝트 팀 상세 */
export interface ProjectTeam extends TeamBase {
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages?: string[]
  teamStacks: { stackName: string; isMain: boolean }[]
}

/** 스터디 팀 상세 */
export interface StudyTeam extends TeamBase {
  type: 'study'
  recruitNum: number
  studyExplain: string
}

/** 합쳐진 팀 타입 */
export type Team = ProjectTeam | StudyTeam

/** API 응답 형태 */
export interface TeamsResponse {
  allTeams: Team[]
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
  mainImageFile: File | null
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
