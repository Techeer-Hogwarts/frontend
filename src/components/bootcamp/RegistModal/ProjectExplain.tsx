import React from 'react'

const ProjectExplain = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">소개</label>
      <textarea
        value={formData.projectExplain}
        onChange={(e) => {
          const value = e.target.value
          if (value.length > 60) {
            alert('60자 이내로 입력해주세요.')
            return
          }
          handleChange('projectExplain', value)
        }}
        className="w-full border-lightgray border-2 px-3 py-2 rounded-md resize-none h-[80px]"
        placeholder="프로젝트 소개를 입력하세요"
        maxLength={60}
      />
    </div>
  )
}

export default ProjectExplain
