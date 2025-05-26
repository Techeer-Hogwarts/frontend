import {
  TabOption,
  RecruitmentOption,
  ProgressOption,
  PositionOption,
} from '@/types/project/project'

/** TapBar 에 넘길 옵션 */
export const TAB_OPTIONS: TabOption[] = ['전체보기', '프로젝트', '스터디']

/** 모집여부 드롭다운 */
export const RECRUITMENT_OPTIONS: RecruitmentOption[] = ['모집 중', '모집 완료']

/** 진행여부 드롭다운 */
export const PROGRESS_OPTIONS: ProgressOption[] = ['진행 중', '진행 완료']

/** 포지션 드롭다운 */
export const POSITION_OPTIONS: PositionOption[] = [
  'frontend',
  'backend',
  'devops',
  'fullstack',
  'dataEngineer',
]
