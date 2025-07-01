import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ProjectDetailProps {
  ProjectDetail: BootcampDetailType
}

const ProjectTeam = ({ ProjectDetail }: ProjectDetailProps) => {
  return (
    <div>
      <p className="text-2xl font-bold mb-2">Team {ProjectDetail.team}</p>
      <div className="flex gap-14">
        <p className="font-bold text-xl text-primary w-[50px]">Leader</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.isLeader === true)
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-14">
        <p className="font-bold text-xl text-primary w-[50px]">Backend</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.position === 'BE')
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-14">
        <p className="font-bold text-xl text-primary w-[50px]">Frontend</p>
        <p className="text-lg">
          {ProjectDetail.members
            .filter((member) => member.position === 'FE')
            .map((member) => member.name)
            .join(' ')}
        </p>
      </div>
      <div className="flex gap-14">
        <p className="font-bold text-xl text-primary w-[50px]">DevOps</p>
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
