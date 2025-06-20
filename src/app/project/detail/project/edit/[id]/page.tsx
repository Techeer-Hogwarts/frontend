import EditProjectClient from '@/components/project/detail/project/EditProjectClient'
import { EditProjectPageProps } from '@/types/project/projectEdit'

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const projectId = Number(params.id)

  return <EditProjectClient projectId={projectId} />
}
