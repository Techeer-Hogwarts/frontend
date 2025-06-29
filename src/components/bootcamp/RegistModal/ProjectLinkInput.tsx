import React from 'react'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Link from '@/../public/link.svg'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

const ProjectLinkInput = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">링크</label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Git />
          <input
            type="text"
            value={formData.githubUrl}
            onChange={(e) => handleChange('githubUrl', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
            placeholder="GitHub URL"
          />
        </div>
        <div className="flex items-center gap-2">
          <Medium />
          <input
            type="text"
            value={formData.mediumUrl}
            onChange={(e) => handleChange('mediumUrl', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
            placeholder="Medium URL"
          />
        </div>
        <div className="flex items-center gap-2">
          <Link />
          <input
            type="text"
            value={formData.webUrl}
            onChange={(e) => handleChange('webUrl', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
            placeholder="서비스 URL"
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectLinkInput
