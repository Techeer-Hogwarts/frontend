import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

const ProjectExplain = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">소개</label>
      <textarea
        value={formData.projectExplain}
        onChange={(e) => handleChange('projectExplain', e.target.value)}
        className="w-full border-lightgray border-2 px-3 py-2 rounded-md resize-none h-[80px]"
        placeholder="프로젝트 소개를 입력하세요"
      />
    </div>
  )
}

export default ProjectExplain
