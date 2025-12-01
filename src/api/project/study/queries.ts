import { useQuery } from '@tanstack/react-query'
import { studyKeys } from './keys'
import { getStudyDetail, getStudyMember, getStudyApplicants } from './apis'

// 스터디 상세 조회
export const useStudyDetailQuery = (studyTeamId: number) => {
  return useQuery({
    queryKey: studyKeys.studyDetail(studyTeamId),
    queryFn: () => getStudyDetail(studyTeamId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!studyTeamId, // studyTeamId가 있을 때만 실행
  })
}

// 스터디 멤버 조회
export const useStudyMembersQuery = (studyTeamId: number) => {
  return useQuery({
    queryKey: studyKeys.studyMembers(studyTeamId),
    queryFn: () => getStudyMember(studyTeamId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!studyTeamId, // studyTeamId가 있을 때만 실행
  })
}

// 스터디 지원자 조회
export const useStudyApplicantsQuery = (studyTeamId: number) => {
  return useQuery({
    queryKey: studyKeys.studyApplicants(studyTeamId),
    queryFn: () => getStudyApplicants(studyTeamId),
    staleTime: 2 * 60 * 1000, // 2분 (자주 변경될 수 있음)
    gcTime: 5 * 60 * 1000, // 5분
    enabled: !!studyTeamId, // studyTeamId가 있을 때만 실행
  })
}
