import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ProjectDetailProps {
  ProjectDetail: BootcampDetailType
}

const ProjectTeam = ({ ProjectDetail }: ProjectDetailProps) => {
  return (
    <div>
      <p className="text-2xl font-bold">Team {ProjectDetail.team}</p>
      <div className="flex gap-10">
        <p className="font-bold text-xl text-primary w-[50px]">Leader</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.isLeader === true)
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-10">
        <p className="font-bold text-xl text-primary w-[50px]">BE</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.position === 'BACKEND')
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-10">
        <p className="font-bold text-xl text-primary w-[50px]">FE</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.position === 'FRONTEND')
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-10">
        <p className="font-bold text-xl text-primary w-[50px]">DEV</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.position === 'DEV')
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
    </div>
  )
}

export default ProjectTeam
