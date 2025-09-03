import EditProjectClient from '@/components/project/detail/project/EditProjectClient'
import { EditProjectPageProps } from '@/types/project/projectEdit'

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params
  const projectId = Number(id)

  return <EditProjectClient projectId={projectId} />
}
