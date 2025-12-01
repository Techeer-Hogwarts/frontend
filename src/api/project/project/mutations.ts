import { useMutation, useQueryClient } from '@tanstack/react-query'
import { projectKeys } from './keys'
import { commonKeys } from '../common/keys'
import {
  handleAddProject,
  handleEditProject,
  handleCloseProject,
  deleteProjectTeam,
  handleApplyProject,
  handleDenyProject,
  acceptProjectApplicant,
  denyProjectApplicant,
} from './apis'
// 프로젝트 관련 타입들을 기존 타입 폴더에서 직접 import
import type { ProjectData, Applicant } from '@/types/project/project'

// 프로젝트 생성 요청 데이터 (기존 ProjectData 기반)
interface CreateProjectRequest {
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
  mainImage?: File
  resultImages?: File[]
}

// 프로젝트 수정 요청 데이터
interface UpdateProjectRequest {
  name?: string
  recruitExplain?: string
  recruitNum?: number
  rule?: string
  goal?: string
  projectExplain?: string
  notionLink?: string
  githubLink?: string
  mainImage?: File
  resultImages?: File[]
}

// 프로젝트 지원 요청
interface ApplyProjectRequest {
  projectTeamId: number
  message?: string
}

// 프로젝트 지원자 수락/거부 요청
interface ProjectApplicantActionRequest {
  projectTeamId: number
  userId: number
}

// 프로젝트 생성
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => handleAddProject(data),
    onSuccess: () => {
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 수정
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: number
      data: UpdateProjectRequest
    }) => handleEditProject(projectId, data),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables.projectId),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 마감
export const useCloseProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectTeamId: number) => handleCloseProject(projectTeamId),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 삭제
export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: number) => deleteProjectTeam(projectId),
    onSuccess: () => {
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 지원
export const useApplyProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ApplyProjectRequest) => handleApplyProject(data),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables.projectTeamId),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 지원 취소
export const useCancelProjectApplicationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: number) => handleDenyProject(projectId),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables),
      })
      // 팀 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: commonKeys.teamList({}),
      })
    },
  })
}

// 프로젝트 지원자 수락
export const useAcceptProjectApplicantMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectApplicantActionRequest) =>
      acceptProjectApplicant(data),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables.projectTeamId),
      })
      // 프로젝트 멤버 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectMembers(variables.projectTeamId),
      })
      // 프로젝트 지원자 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectApplicants(variables.projectTeamId),
      })
    },
  })
}

// 프로젝트 지원자 거부
export const useRejectProjectApplicantMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectApplicantActionRequest) =>
      denyProjectApplicant(data),
    onSuccess: (data, variables) => {
      // 프로젝트 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectDetail(variables.projectTeamId),
      })
      // 프로젝트 지원자 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.projectApplicants(variables.projectTeamId),
      })
    },
  })
}
