export const handleLikeClick = async (
  resumeId: number,
  category: 'SESSION' | 'BLOG' | 'RESUME' | 'PROJECT' | 'STUDY',
  likes: { [key: number]: { count: number; isLiked: boolean } },
  setLikes: React.Dispatch<
    React.SetStateAction<{ [key: number]: { count: number; isLiked: boolean } }>
  >,
) => {
  // 좋아요 상태 업데이트
  setLikes((prevLikes) => {
    const prevState = prevLikes[resumeId] || { count: 0, isLiked: false }
    const updatedLikeCount = prevState.isLiked
      ? prevState.count - 1
      : prevState.count + 1
    const updatedLikes = {
      ...prevLikes,
      [resumeId]: { count: updatedLikeCount, isLiked: !prevState.isLiked },
    }

    // localStorage 업데이트
    localStorage.setItem('likes', JSON.stringify(updatedLikes))
    return updatedLikes
  })

  try {
    const likeStatus = !likes[resumeId]?.isLiked
    const response = await fetch('/api/v3/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentId: resumeId,
        category,
        likeStatus,
      }),
    })
    if (!response.ok) {
      throw new Error('Like request failed')
    }
  } catch (error) {}
}
