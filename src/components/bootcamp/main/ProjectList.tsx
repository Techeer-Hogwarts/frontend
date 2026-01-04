import React from 'react'
import ProjectItem from './ProjectItem'
import { BootcampType } from '@/types/bootcamp/bootcamp'
import ProjectListSkeleton from './ProjectListSkeleton'

interface ProjectListProps {
  isLoading: boolean
  allProject: BootcampType[]
  setSelectedID: (id: number) => void
  setOpenModal: (open: boolean) => void
}

const ProjectList = ({
  isLoading,
  allProject,
  setSelectedID,
  setOpenModal,
}: ProjectListProps) => {
  return (
    <>
      {isLoading ? (
        <div>
          <ProjectListSkeleton />
        </div>
      ) : allProject.length > 0 ? (
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
      ) : (
        <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400 mt-10 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-xl font-medium">등록된 프로젝트가 없습니다.</p>
        </div>
      )}
    </>
  )
}

export default ProjectList
