import ProjectDetailClient from '@/components/project/detail/project/ProjectDetailClient'
import { ProjectDetailPageProps } from '@/types/project/project'

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectId = Number(params.id)

  return <ProjectDetailClient projectId={projectId} />
}
