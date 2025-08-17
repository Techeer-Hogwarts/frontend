import { useMutation, useQueryClient } from '@tanstack/react-query'
import { csKeys } from './keys'
import { submitCsAnswer } from './apis'
import { CsAnswerSubmitRequest } from './types'

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
