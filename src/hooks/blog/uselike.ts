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
    const prevLikeState = isLike
    const prevLikeCount = likeCount

    try {
      const newLikeState = !isLike
      console.log('좋아요 토글 시작:', {
        id,
        category,
        prevLikeState,
        newLikeState,
        prevLikeCount
      })

      // 낙관적 업데이트
      setIsLike(newLikeState)
      setLikeCount((prev) => (newLikeState ? prev + 1 : Math.max(0, prev - 1)))

      const response = await postLikeMutation.mutateAsync({
        contentId: Number(id),
        category,
        likeStatus: newLikeState,
      })

      console.log('좋아요 API 성공:', response)
    } catch (err) {
      console.error('좋아요 상태 업데이트 실패:', err)

      // 에러 발생 시 상태 롤백
      setIsLike(prevLikeState)
      setLikeCount(prevLikeCount)
    }
  }

  return { isLike, likeCount, toggleLike }
}
