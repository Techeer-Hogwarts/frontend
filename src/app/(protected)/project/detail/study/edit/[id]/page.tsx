import EditStudyClient from '@/components/project/detail/study/EditStudyClient'
import { EditStudyPageProps } from '@/types/project/studyEdit'

export default function EditStudyPage({ params }: EditStudyPageProps) {
  const studyId = Number(params.id)

  return <EditStudyClient studyId={studyId} />
}
