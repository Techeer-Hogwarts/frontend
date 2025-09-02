import EditStudyClient from '@/components/project/detail/study/EditStudyClient'
import { EditStudyPageProps } from '@/types/project/studyEdit'

export default async function EditStudyPage({ params }: EditStudyPageProps) {
  const { id } = await params
  const studyId = Number(id)

  return <EditStudyClient studyId={studyId} />
}
