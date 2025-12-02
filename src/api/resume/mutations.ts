import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resumeKeys } from './keys'
import { postBookmark, uploadResume } from './apis'
import { LikeBookmarkRequest, ResumeUploadRequest } from './types'

// 북마크 mutation
export const useResumeBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, LikeBookmarkRequest>({
    mutationKey: [...resumeKeys.all, 'bookmark'],
    mutationFn: postBookmark,
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: resumeKeys.detail(variables.contentId),
        }),
        queryClient.invalidateQueries({ queryKey: resumeKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: resumeKeys.bestList() }),
      ])
    },
  })
}

// 이력서 업로드 mutation
export const useResumeUploadMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, data }: { file: File; data: ResumeUploadRequest }) =>
      uploadResume(file, data),
    onSuccess: () => {
      // 이력서 업로드 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: resumeKeys.all })
    },
  })
}
