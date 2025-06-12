import {
  TabOption,
  RecruitmentOption,
  ProgressOption,
  PositionOption,
} from '@/types/project/project'

/** TapBar 에 넘길 옵션 */
export const TAB_OPTIONS: TabOption[] = ['전체보기', '프로젝트', '스터디']

/** 정렬 드롭다운 */
export const SORT_OPTIONS = [
  '최신 순', // UPDATE_AT_DESC
  '조회수 순', // VIEW_COUNT_DESC
  '좋아요 순', // LIKE_COUNT_DESC
]

/** 모집여부 드롭다운 */
export const RECRUITMENT_OPTIONS: RecruitmentOption[] = ['모집 중', '모집 완료']

/** 진행여부 드롭다운 */
export const PROGRESS_OPTIONS: ProgressOption[] = ['진행 중', '진행 완료']

/** 포지션 드롭다운 */
export const POSITION_OPTIONS: PositionOption[] = [
  'FRONTEND',
  'BACKEND',
  'DEVOPS',
  'FULLSTACK',
  'DATA_ENGINEER',
]
