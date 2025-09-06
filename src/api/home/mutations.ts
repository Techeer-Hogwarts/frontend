import { useMutation, useQueryClient } from '@tanstack/react-query'
import { homeKeys } from './keys'

// 홈 페이지는 주로 데이터 조회만 하므로 뮤테이션이 적습니다.
// 필요시 여기에 추가할 수 있습니다.

// 예시: 좋아요 토글 뮤테이션 (필요시 사용)
export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      type,
      id,
    }: {
      type: 'blog' | 'resume' | 'project' | 'study'
      id: number
    }) => {
      const resource = type === 'study' ? 'studies' : `${type}s`
      const response = await fetch(`/api/${resource}/${id}/like`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('좋아요 토글에 실패했습니다.')
      }

      return response.json()
    },
    onSuccess: (data, variables) => {
      // 관련 쿼리 무효화
      if (variables.type === 'blog') {
        queryClient.invalidateQueries({ queryKey: homeKeys.blog() })
      } else if (variables.type === 'resume') {
        queryClient.invalidateQueries({ queryKey: homeKeys.resume() })
      } else if (variables.type === 'project' || variables.type === 'study') {
        queryClient.invalidateQueries({ queryKey: homeKeys.teams() })
      }
    },
  })
}

// 예시: 북마크 토글 뮤테이션 (필요시 사용)
export const useToggleBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      type,
      id,
    }: {
      type: 'blog' | 'resume' | 'project' | 'study'
      id: number
    }) => {
      const resource = type === 'study' ? 'studies' : `${type}s`
      const response = await fetch(`/api/${resource}/${id}/bookmark`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('북마크 토글에 실패했습니다.')
      }

      return response.json()
    },
    onSuccess: (data, variables) => {
      // 관련 쿼리 무효화
      if (variables.type === 'blog') {
        queryClient.invalidateQueries({ queryKey: homeKeys.blog() })
      } else if (variables.type === 'resume') {
        queryClient.invalidateQueries({ queryKey: homeKeys.resume() })
      } else if (variables.type === 'project' || variables.type === 'study') {
        queryClient.invalidateQueries({ queryKey: homeKeys.teams() })
      }
    },
  })
}
