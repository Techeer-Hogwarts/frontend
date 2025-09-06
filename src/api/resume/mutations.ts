import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resumeKeys } from './keys'

// Resume mutations를 여기에 추가할 수 있습니다
// 예: 이력서 업로드, 수정, 삭제 등

// 예시 - 이력서 좋아요 mutation (필요시 추가)
// export const useResumelikeMutation = () => {
//   const queryClient = useQueryClient()
//
//   return useMutation({
//     mutationFn: ({ resumeId, isLike }: { resumeId: string, isLike: boolean }) =>
//       // API 호출
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: resumeKeys.all })
//     },
//   })
// }
