import React from 'react'
import ProjectItem from './ProjectItem'
import { BootcampType } from '@/types/bootcamp/bootcamp'

interface ProjectListProps {
  allProject: BootcampType[]
  setSelectedID: (id: number) => void
  setOpenModal: (open: boolean) => void
}

const ProjectList = ({
  allProject,
  setSelectedID,
  setOpenModal,
}: ProjectListProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {allProject.map((bootcamp: BootcampType) => (
        <ProjectItem
          key={bootcamp.id}
          bootcamp={bootcamp}
          setSelectedID={setSelectedID}
          setOpenModal={setOpenModal}
        />
      ))}
    </div>
  )
}

export default ProjectList
