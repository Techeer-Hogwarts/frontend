import StudyDetailClient from '@/components/project/detail/study/StudyDetailClient'
import { DetailPageProps } from '@/types/project/project'

export default async function StudyDetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const studyId = Number(id)

  return <StudyDetailClient studyId={studyId} />
}
