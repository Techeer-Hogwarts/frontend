import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

const API_URL = '/api/v1/likes'

// 좋아요 추가/제거 API
export const postLike = async (
  contentId: number,
  category: string,
  likeStatus: boolean,
) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contentId,
      category,
      likeStatus,
    }),
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '좋아요 처리 중 오류 발생')
  }

  return response.json()
}
export const usePostLikeAPI = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      contentId,
      category,
      likeStatus,
    }: {
      contentId: number
      category: string
      likeStatus: boolean
    }) => postLike(contentId, category, likeStatus),
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({ queryKey: ['likes'] })

      const previousLikes = queryClient.getQueryData(['likes'])

      queryClient.setQueryData(['likes'], (old: any) =>
        old
          ? old.map((item: any) =>
            item.id === newLike.contentId
              ? { ...item, likeStatus: newLike.likeStatus }
              : item,
          )
          : [],
      )

      return { previousLikes }
    },
    onError: (err, _, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(['likes'], context.previousLikes)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })
}

// 좋아요 목록 조회 API
const getLikes = async (category: string, offset: number, limit: number) => {
  const response = await fetch(
    `${API_URL}?category=${category}&offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '좋아요 조회 중 오류 발생')
  }

  return response.json()
}

export function useGetLikesAPI(
  category: string,
  offset: number,
  limit: number,
) {
  return useQuery({
    queryKey: ['likes', category, offset, limit],
    queryFn: () => getLikes(category, offset, limit),
  })
}
