import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { commonKeys } from './keys'
import { GetAllTeamsFilter } from '@/types/project/project'
import { getAllTeams, getAllUsers, getMyInfo, getStacks } from './apis'

// 팀 목록 조회 (무한 스크롤)
export const useTeamListQuery = (
  params: Omit<GetAllTeamsFilter, 'id' | 'dateCursor' | 'countCursor'>,
) => {
  return useInfiniteQuery({
    queryKey: commonKeys.teamList(params),
    queryFn: ({ pageParam }) => {
      // 첫 페이지인 경우 커서 정보 없이 호출
      if (pageParam === undefined) {
        return getAllTeams(params)
      }

      // 다음 페이지인 경우 커서 정보와 함께 호출
      return getAllTeams({
        ...params,
        id: pageParam.id,
        dateCursor: pageParam.dateCursor,
        countCursor: pageParam.countCursor,
      })
    },
    initialPageParam: undefined as any,
    getNextPageParam: (lastPage) => {
      // nextInfo가 없거나 hasNext가 false면 더 이상 페이지가 없음
      if (!lastPage.nextInfo || !lastPage.nextInfo.hasNext) {
        return undefined
      }

      // 다음 페이지를 위한 커서 정보 반환
      return {
        id: lastPage.nextInfo.id,
        dateCursor: lastPage.nextInfo.dateCursor,
        countCursor: lastPage.nextInfo.countCursor,
      }
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 모든 사용자 조회
export const useAllUsersQuery = () => {
  return useQuery({
    queryKey: commonKeys.allUsers(),
    queryFn: getAllUsers,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  })
}

// 내 정보 조회
export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: commonKeys.myInfo(),
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// 스택 목록 조회
export const useStacksQuery = () => {
  return useQuery({
    queryKey: commonKeys.stackList(),
    queryFn: getStacks,
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 1시간
  })
}
