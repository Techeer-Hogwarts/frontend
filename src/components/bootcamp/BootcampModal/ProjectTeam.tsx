import React from 'react'
import { BootcampDetailType } from '@/types/bootcamp/bootcamp'

interface ProjectDetailProps {
  ProjectDetail: BootcampDetailType
}

const ProjectTeam = ({ ProjectDetail }: ProjectDetailProps) => {
  const getMembersByPosition = (position: string) => 
    ProjectDetail.members
      .filter((m) => m.position === position && m.name !== 'admin')
      .map((m) => m.name)

  const leaders = ProjectDetail.members
    .filter((m) => m.isLeader && m.name !== 'admin')
    .map((m) => m.name)

  const positions = [
    { label: 'Leader', names: leaders, color: 'bg-primary/10 text-primary' },
    { label: 'Backend', names: getMembersByPosition('BE'), color: 'bg-blue-50 text-blue-600' },
    { label: 'Frontend', names: getMembersByPosition('FE'), color: 'bg-pink-50 text-pink-600' },
    { label: 'DevOps', names: getMembersByPosition('DEV'), color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-darkgray flex items-center gap-2 mb-4">
        <span className="w-1.5 h-6 bg-darkgray rounded-full inline-block" />
        Team {ProjectDetail.team}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {positions.map((pos) => (
            pos.names.length > 0 && (
                <div key={pos.label} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold w-fit ${pos.color}`}>
                        {pos.label}
                    </span>
                    <p className="text-base text-gray-700 font-medium flex-1 leading-relaxed">
                        {pos.names.join(', ')}
                    </p>
                </div>
            )
        ))}
      </div>
    </div>
  )
}

export default ProjectTeam
