import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { csKeys } from './keys'
import {
  CsProblemListParams,
  CsAnswerListParams,
  CsCommentListParams,
} from './types'
import {
  getTodayCs,
  getCsProblemList,
  getCsProblemDetail,
  getCsAnswerList,
  getCsCommentList,
} from './apis'

// 오늘의 CS 문제 조회
export const useTodayCsQuery = () => {
  return useQuery({
    queryKey: csKeys.today(),
    queryFn: getTodayCs,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// CS 문제 목록 조회 (무한 스크롤)
export const useCsProblemListQuery = (
  params: Omit<CsProblemListParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: csKeys.problemList(params),
    queryFn: ({ pageParam }) =>
      getCsProblemList({ ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })
}

// CS 문제 상세 조회
export const useCsProblemDetailQuery = (problemId: number) => {
  return useQuery({
    queryKey: csKeys.problemDetail(problemId),
    queryFn: () => getCsProblemDetail(problemId),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
    enabled: !!problemId, // problemId가 있을 때만 실행
  })
}

// CS 답변 목록 조회 (무한 스크롤)
export const useCsAnswerListQuery = (
  problemId: number,
  params: Omit<CsAnswerListParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: csKeys.answerList(problemId, params),
    queryFn: ({ pageParam }) =>
      getCsAnswerList(problemId, { ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!problemId, // problemId가 있을 때만 실행
  })
}

// CS 댓글 목록 조회 (무한 스크롤)
export const useCsCommentListQuery = (
  answerId: number,
  params: Omit<CsCommentListParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: csKeys.commentList(answerId, params),
    queryFn: ({ pageParam }) =>
      getCsCommentList(answerId, { ...params, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!answerId, // answerId가 있을 때만 실행
  })
}
