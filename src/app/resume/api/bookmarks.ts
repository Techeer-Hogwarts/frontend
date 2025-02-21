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
    const isMarked = !bookmarks[resumeId]?.isMarked
    const response = await fetch('/api/v1/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentId: resumeId,
        category,
        bookmarkStatus: isMarked,
      }),
    })

    // 서버 응답을 기다리고, 성공적으로 요청이 완료된 후 상태 업데이트
    if (response.ok) {
      setBookmarks((prevBookmarks) => {
        const prevState = prevBookmarks[resumeId]
        const updatedBookmarkCount = prevState?.isMarked
          ? prevState.count - 1
          : prevState.count + 1
        const updatedBookmarks = {
          ...prevBookmarks,
          [resumeId]: {
            count: updatedBookmarkCount,
            isMarked: isMarked,
          },
        }
        // 변경된 북마크 상태를 localStorage에 저장
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))

        return updatedBookmarks
      })
    } else {
      throw new Error('Bookmark request failed')
    }
  } catch (error) {
    console.error('Bookmark request error:', error)
  }
}
