import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

const ProjectTitleInput = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">프로젝트 제목</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => {
          const value = e.target.value
          if (value.length > 30) {
            alert('30자 이내로 입력해주세요.')
            return
          }
          handleChange('name', e.target.value)
        }}
        className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
        placeholder="프로젝트명을 입력하세요"
        maxLength={30}
      />
    </div>
  )
}

export default ProjectTitleInput
