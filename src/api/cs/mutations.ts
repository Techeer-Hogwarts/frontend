import { useMutation, useQueryClient } from '@tanstack/react-query'
import { csKeys } from './keys'
import {
  submitCsAnswer,
  submitCsComment,
  updateCsAnswer,
  deleteCsAnswer,
} from './apis'
import {
  CsAnswerSubmitRequest,
  CsCommentSubmitRequest,
  CsAnswerUpdateRequest,
} from './types'

// CS 답변 제출
export const useSubmitCsAnswerMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      problemId,
      data,
    }: {
      problemId: number
      data: CsAnswerSubmitRequest
    }) => submitCsAnswer(problemId, data),
    onSuccess: (data, variables) => {
      // 답변 제출 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: csKeys.problemDetail(variables.problemId),
      })
      queryClient.invalidateQueries({ queryKey: csKeys.today() })
      queryClient.invalidateQueries({ queryKey: csKeys.problemList({}) })
    },
  })
}

// CS 댓글 작성
export const useSubmitCsCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      answerId,
      data,
    }: {
      answerId: number
      data: CsCommentSubmitRequest
    }) => submitCsComment(answerId, data),
    onSuccess: (data, variables) => {
      // 댓글 작성 성공 시 댓글 목록과 답변 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: csKeys.commentList(variables.answerId, {}),
      })
    },
  })
}

// 답변 수정 mutation
export const useUpdateCsAnswerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      answerId,
      data,
    }: {
      answerId: number
      data: CsAnswerUpdateRequest
    }) => updateCsAnswer(answerId, data),
    onSuccess: () => {
      // 답변 목록 무효화
      queryClient.invalidateQueries({ queryKey: csKeys.answers() })
    },
  })
}

// 답변 삭제 mutation
export const useDeleteCsAnswerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (answerId: number) => deleteCsAnswer(answerId),
    onSuccess: () => {
      // 답변 목록 무효화
      queryClient.invalidateQueries({ queryKey: csKeys.answers() })
    },
  })
}
