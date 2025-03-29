import { useState, useEffect } from 'react'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'

export function useResumeInteractions() {
  const [likeList, setLikeList] = useState<string[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  useEffect(() => {
    checkLike()
    checkBookmark()
  }, [])

  const checkLike = async () => {
    try {
      const data = await fetchLikes('RESUME', 0, 50)
      setLikeList(data)
    } catch (err) {
      console.error(err)
    }
  }

  const checkBookmark = async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    likeList,
    bookmarkList,
    checkLike,
    checkBookmark,
  }
}
