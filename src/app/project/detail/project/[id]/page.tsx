import ProjectDetailClient from '@/components/project/detail/project/ProjectDetailClient'
import { DetailPageProps } from '@/types/project/project'

export default function ProjectDetailPage({ params }: DetailPageProps) {
  const projectId = Number(params.id)

  return <ProjectDetailClient projectId={projectId} />
}
