import StudyDetailClient from '@/components/project/detail/study/StudyDetailClient'
import { DetailPageProps } from '@/types/project/project'

export default function StudyDetailPage({ params }: DetailPageProps) {
  const studyId = Number(params.id)

  return <StudyDetailClient studyId={studyId} />
}
