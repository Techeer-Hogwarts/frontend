import React from 'react'

const ProjectTeamName = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">팀 알파벳</label>
      <input
        type="text"
        value={formData.team}
        onChange={(e) => {
          const value = e.target.value
          if (/^[a-zA-Z]?$/.test(value)) {
            handleChange('team', value.toUpperCase())
          } else {
            alert('영어 알파벳 한 글자만 입력 가능합니다.')
          }
        }}
        maxLength={1}
        className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
        placeholder="A"
      />
    </div>
  )
}

export default ProjectTeamName
