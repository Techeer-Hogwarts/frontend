import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resumeKeys } from './keys'

// Resume mutations를 여기에 추가할 수 있습니다
// 예: 이력서 업로드, 수정, 삭제 등

// 예시 - 이력서 좋아요 mutation (필요시 추가)
// export const useResumeLikeMutation = () => {
//   const queryClient = useQueryClient()
//
//   return useMutation({
//     mutationFn: ({ resumeId, isLike }: { resumeId: string, isLike: boolean }) =>
//       // API 호출 함수 (실제 구현 필요)
//       Promise.resolve(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: resumeKeys.all })
//     },
//   })
// }

// 예시 - 이력서 북마크 mutation (필요시 추가)
// export const useResumeBookmarkMutation = () => {
//   const queryClient = useQueryClient()
//
//   return useMutation({
//     mutationFn: ({ resumeId, isBookmark }: { resumeId: string, isBookmark: boolean }) =>
//       // API 호출 함수 (실제 구현 필요)
//       Promise.resolve(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: resumeKeys.all })
//     },
//   })
// }
