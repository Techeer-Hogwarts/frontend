import { useState, useEffect } from 'react'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import { useResumeBookmarkMutation } from '@/api/resume/mutations'

export const useResumeLikeBookmark = (
  resume: Resume,
  initialLikeCount: number,
  likeList: string[],
  bookmarkList: string[],
  onLikeUpdate: (resumeId: string, newLikeCount: number) => void,
  onBookmarkUpdate: (resumeId: string, newBookmarkCount: number) => void,
) => {
  const { postLike } = useLike()
  const { postBookmark } = useBookmark()
  const bookmarkMutation = useResumeBookmarkMutation()

  const [isLike, setIsLike] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [bookmarkCount, setBookmarkCount] = useState(initialLikeCount)

  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(
        likeList.some(
          (bookmark: any) => String(bookmark.id) === String(resume.id),
        ),
      )
    }
    if (Array.isArray(bookmarkList)) {
      setIsBookmark(
        bookmarkList.some(
          (bookmark: any) => String(bookmark.id) === String(resume.id),
        ),
      )
    }
  }, [likeList, bookmarkList, resume.id])

  const clickLike = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      const newIsLike = !isLike
      const newLikeCount = newIsLike ? likeCount + 1 : likeCount - 1

      setIsLike(newIsLike)
      setLikeCount(newLikeCount)

      await postLike(Number(resume.id), 'RESUME', newIsLike)

      if (typeof onLikeUpdate === 'function') {
        onLikeUpdate(resume.id, newLikeCount)
      }
    } catch (err) {
      setIsLike(!isLike)
      setLikeCount(isLike ? likeCount : likeCount - 1)
      console.error(err)
    }
  }

  const clickBookmark = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      const newIsBookmark = !isBookmark
      const newBookmarkCount = newIsBookmark
        ? bookmarkCount + 1
        : bookmarkCount - 1

      setIsBookmark(newIsBookmark)
      setBookmarkCount(newBookmarkCount)

      await bookmarkMutation.mutateAsync({
        contentId: Number(resume.id),
        category: 'RESUME',
        bookmarkStatus: newIsBookmark,
      })

      onBookmarkUpdate(resume.id, newBookmarkCount)
    } catch (err) {
      setIsBookmark(!isBookmark)
      setBookmarkCount(isBookmark ? bookmarkCount : bookmarkCount - 1)
      console.error(err)
    }
  }

  return {
    isLike,
    isBookmark,
    likeCount,
    bookmarkCount,
    clickLike,
    clickBookmark,
  }
}

