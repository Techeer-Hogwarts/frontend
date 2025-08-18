import { useMutation, useQueryClient } from '@tanstack/react-query'
import { csKeys } from './keys'
import { submitCsAnswer, submitCsComment } from './apis'
import { CsAnswerSubmitRequest, CsCommentSubmitRequest } from './types'

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
      // 댓글 작성 성공 시 답변 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: csKeys.answerList(variables.answerId, {}),
      })
    },
  })
}
