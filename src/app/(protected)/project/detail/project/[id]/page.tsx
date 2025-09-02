import ProjectDetailClient from '@/components/project/detail/project/ProjectDetailClient'
import { DetailPageProps } from '@/types/project/project'

export default async function ProjectDetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const projectId = Number(id)

  return <ProjectDetailClient projectId={projectId} />
}
