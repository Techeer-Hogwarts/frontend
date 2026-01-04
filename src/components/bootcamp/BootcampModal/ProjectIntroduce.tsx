import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ProjectIntroduceProps {
  ProjectDetail: BootcampDetailType
}

const ProjectIntroduce = ({ ProjectDetail }: ProjectIntroduceProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-bold text-darkgray flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
        프로젝트 소개
      </h3>
      <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
        {ProjectDetail.projectExplain}
      </p>
    </div>
  )
}

export default ProjectIntroduce
