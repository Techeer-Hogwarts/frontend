import { useEffect } from 'react'

export const handleBookmarkClick = async (
  resumeId: number,
  category: 'SESSION' | 'BLOG' | 'RESUME' | 'PROJECT' | 'STUDY',
  bookmarks: { [key: number]: { count: number; isMarked: boolean } },
  setBookmarks: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { count: number; isMarked: boolean }
    }>
  >,
) => {
  // 북마크 상태 업데이트를 서버 응답 후로 변경
  try {
    const bookmarkStatus = !bookmarks[resumeId]?.isMarked
    const response = await fetch('/api/v1/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentId: resumeId,
        category,
        bookmarkStatus,
      }),
    })
    if (!response.ok) {
      throw new Error('Bookmark request failed')
    }
  } catch (error) {
  }

  // 북마크 상태 업데이트
  setBookmarks((prevBookmarks) => {
    const prevState = prevBookmarks[resumeId] || { count: 0, isMarked: false }
    const updatedBookmarkCount = prevState.isMarked
      ? prevState.count - 1
      : prevState.count + 1
    const updatedBookmarks = {
      ...prevBookmarks,
      [resumeId]: {
        count: updatedBookmarkCount,
        isMarked: !prevState.isMarked,
      },
    }

    // localStorage 업데이트
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    return updatedBookmarks
  })
}
