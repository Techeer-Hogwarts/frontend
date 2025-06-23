import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

const ProjectTeamName = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">팀 알파벳</label>
      <input
        type="text"
        value={formData.team}
        onChange={(e) => handleChange('team', e.target.value)}
        className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
        placeholder="A"
      />
    </div>
  )
}

export default ProjectTeamName
