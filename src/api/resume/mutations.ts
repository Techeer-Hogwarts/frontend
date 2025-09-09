import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resumeKeys } from './keys'
import { postLike, postBookmark, uploadResume } from './apis'
import { LikeBookmarkRequest, ResumeUploadRequest } from './types'

// 좋아요 mutation
export const useResumeLikeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LikeBookmarkRequest) => postLike(data),
    onSuccess: () => {
      // 좋아요 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: resumeKeys.all })
    },
  })
}

// 북마크 mutation
export const useResumeBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LikeBookmarkRequest) => postBookmark(data),
    onSuccess: () => {
      // 북마크 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: resumeKeys.all })
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
