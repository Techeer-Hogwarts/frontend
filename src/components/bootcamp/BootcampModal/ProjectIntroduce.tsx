import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ProjectIntroduceProps {
  ProjectDetail: BootcampDetailType
}

const ProjectIntroduce = ({ ProjectDetail }: ProjectIntroduceProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-bold">소개</p>
      <p className="text-lg">{ProjectDetail.projectExplain}</p>
    </div>
  )
}

export default ProjectIntroduce
