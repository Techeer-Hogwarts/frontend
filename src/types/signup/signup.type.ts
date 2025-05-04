export type internshipsType = {
  companyName: string
  position: string
  startDate: string
  endDate: string
  isCurrentJob: boolean
}

export type fulltimesType = {
  companyName: string
  position: string
  startDate: string
  endDate: string
  isCurrentJob: boolean
}

export const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isVerified: false,

  school: '',
  customSchool: '', // “해당 없음” 선택 시, 직접 입력한 학교명
  classYear: '',
  selectedBatch: '',
  resumeTitle: '',
  githubUrl: '',
  tistoryUrl: '',
  mediumUrl: '',
  velogUrl: '',
  selectedPositions: [] as string[],
  recommendation: null as string | null,
  employmentStatus: null as string | null,
  // CareerToggle에서 "있어요" 버튼을 누르면 'yes'로 저장됩니다.
  internshipExperience: null as string | null,
  jobExperience: null as string | null,

  // 경험 정보: 기존의 키 대신 unified한 키로 관리
  internships: [] as internshipsType[],
  fullTimes: [] as fulltimesType[],

  // 이력서 추가 정보
  resumeFile: null as File | null,
  resumeCategory: 'RESUME',
  resumeIsMain: true,
  resumePosition: '',
}

export type BlogType = {
  label: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  name: string
}
