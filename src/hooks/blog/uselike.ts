import { useState, useEffect } from 'react'
import { usePostLikeAPI } from '@/api/likes/likes'

export const useLike = (
  id: string,
  likeList: { id: number }[] | null | undefined,
  initialCount: number,
  category: string,
) => {
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(initialCount)
  const postLikeMutation = usePostLikeAPI()

  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(likeList.some((item) => String(item.id) === String(id)))
    } else {
      setIsLike(false)
    }
  }, [likeList, id])

  const toggleLike = async () => {
    try {
      const newLikeState = !isLike
      setIsLike(newLikeState)
      setLikeCount((prev) => (newLikeState ? prev + 1 : Math.max(0, prev - 1)))

      await postLikeMutation.mutateAsync({
        contentId: Number(id),
        category,
        likeStatus: newLikeState,
      })
    } catch (err) {
      console.error('좋아요 상태 업데이트 실패:', err)
    }
  }

  return { isLike, likeCount, toggleLike }
}
