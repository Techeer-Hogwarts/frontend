import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studyKeys } from './keys'
import { commonKeys } from '../common/keys'
import {
  handleAddStudy,
  handleEditStudy,
  handleCloseStudy,
  deleteStudyTeam,
  handleApplyStudy,
  handleDenyStudy,
  acceptStudyApplicant,
  denyStudyApplicant,
} from './apis'
// 스터디 관련 타입들을 기존 타입 폴더에서 직접 import
import type { StudyData, Applicant } from '@/types/project/project'
import type { EditStudyData, EditStudyMember } from '@/types/project/studyEdit'

// 스터디 생성 요청 데이터 (기존 StudyData 기반)
interface CreateStudyRequest {
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
  resultImages?: File[]
}

// 스터디 수정 요청 데이터
interface UpdateStudyRequest {
  name?: string
  recruitExplain?: string
  recruitNum?: number
  rule?: string
  goal?: string
  studyExplain?: string
  notionLink?: string
  githubLink?: string
  mainImage?: File
  resultImages?: File[]
}

// 스터디 지원 요청
interface ApplyStudyRequest {
  studyTeamId: number
  message?: string
}

// 스터디 지원자 수락/거부 요청
interface StudyApplicantActionRequest {
  studyTeamId: number
  userId: number
}

// 스터디 생성
export const useCreateStudyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateStudyRequest) => handleAddStudy(data),
    onSuccess: () => {
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 수정
export const useUpdateStudyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      studyId,
      data,
    }: {
      studyId: number
      data: UpdateStudyRequest
    }) => handleEditStudy(data, studyId),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables.studyId),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 마감
export const useCloseStudyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (studyTeamId: number) => handleCloseStudy(studyTeamId),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 삭제
export const useDeleteStudyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (studyId: number) => deleteStudyTeam(studyId),
    onSuccess: () => {
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 지원
export const useApplyStudyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ApplyStudyRequest) => handleApplyStudy(data),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables.studyTeamId),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 지원 취소
export const useCancelStudyApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (studyTeamId: number) => handleDenyStudy(studyTeamId),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 스터디 지원자 수락
export const useAcceptStudyApplicantMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: StudyApplicantActionRequest) =>
      acceptStudyApplicant(data),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables.studyTeamId),
      })
      // 스터디 멤버 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyMembers(variables.studyTeamId),
      })
      // 스터디 지원자 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyApplicants(variables.studyTeamId),
      })
    },
  })
}

// 스터디 지원자 거부
export const useRejectStudyApplicantMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: StudyApplicantActionRequest) => denyStudyApplicant(data),
    onSuccess: (data, variables) => {
      // 스터디 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyDetail(variables.studyTeamId),
      })
      // 스터디 지원자 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: studyKeys.studyApplicants(variables.studyTeamId),
      })
    },
  })
}
