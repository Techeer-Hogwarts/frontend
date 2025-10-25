import { useQuery } from '@tanstack/react-query'
import { projectKeys } from './keys'
import {
  getProjectDetail,
  getProjectMember,
  getProjectApplicants,
} from './apis'

// 프로젝트 상세 조회
export const useProjectDetailQuery = (projectTeamId: number) => {
  return useQuery({
    queryKey: projectKeys.projectDetail(projectTeamId),
    queryFn: () => getProjectDetail(projectTeamId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!projectTeamId, // projectTeamId가 있을 때만 실행
  })
}

// 프로젝트 멤버 조회
export const useProjectMembersQuery = (projectTeamId: number) => {
  return useQuery({
    queryKey: projectKeys.projectMembers(projectTeamId),
    queryFn: () => getProjectMember(projectTeamId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!projectTeamId, // projectTeamId가 있을 때만 실행
  })
}

// 프로젝트 지원자 조회
export const useProjectApplicantsQuery = (projectTeamId: number) => {
  return useQuery({
    queryKey: projectKeys.projectApplicants(projectTeamId),
    queryFn: () => getProjectApplicants(projectTeamId),
    staleTime: 2 * 60 * 1000, // 2분 (자주 변경될 수 있음)
    gcTime: 5 * 60 * 1000, // 5분
    enabled: !!projectTeamId, // projectTeamId가 있을 때만 실행
  })
}
