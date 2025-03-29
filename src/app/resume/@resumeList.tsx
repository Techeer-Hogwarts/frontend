import EmptyLottie from '@/components/common/EmptyLottie'
import ResumeFolder from '@/components/resume/ResumeFolder'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { useResumeList } from './hooks/useResumeList'
import { useResumeInteractions } from './hooks/useResumeInteractions'

export default function ResumeList({
  position = [],
  year = [],
  category = '전체',
}) {
  const { resumes, isLoading, isError, ref, refetch } = useResumeList({
    position,
    year,
    category,
  })
  const { likeList, bookmarkList, checkLike, checkBookmark } =
    useResumeInteractions()

  const handleLikeUpdate = async (resumeId: string, newLikeCount: number) => {
    setTimeout(() => {
      checkLike()
      refetch()
    }, 500)
  }

  const handleBookmarkUpdate = async (
    resumeId: string,
    newBookmarkCount: number,
  ) => {
    setTimeout(() => {
      checkBookmark()
      refetch()
    }, 500)
  }

  if (isLoading && resumes.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonResumeFolder key={`skeleton-${i}`} />
        ))}
      </div>
    )
  }

  if (isError || resumes.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="이력서 데이터가 없습니다."
          text2="다시 조회해주세요"
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {resumes.map((resume) => (
        <ResumeFolder
          key={resume.id}
          likeCount={resume.likeCount}
          bookCount={resume.bookCount}
          resume={resume}
          likeList={likeList}
          onLikeUpdate={handleLikeUpdate}
          bookmarkList={bookmarkList}
          onBookmarkUpdate={handleBookmarkUpdate}
        />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  )
}
