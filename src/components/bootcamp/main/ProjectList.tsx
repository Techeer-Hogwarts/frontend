import React from 'react'
import ProjectItem from './ProjectItem'

interface ProjectListProps {
  allProject: {
    id: number
    year: number
    imageUrl: string
    rank: number
  }[]
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
      {allProject.map(
        (bootcamp: {
          id: number
          imageUrl: string
          year: number
          rank: number
        }) => (
          <ProjectItem
            bootcamp={bootcamp}
            setSelectedID={setSelectedID}
            setOpenModal={setOpenModal}
          />
        ),
      )}
    </div>
  )
}

export default ProjectList
