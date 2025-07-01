import React, { useEffect } from 'react'
import ProjectItem from './ProjectItem'
import { BootcampType } from '@/types/bootcamp/bootcamp'
import ProjectListSkeleton from './ProjectListSkeleton'

interface ProjectListProps {
  isLoading
  allProject: BootcampType[]
  setSelectedID: (id: number) => void
  setOpenModal: (open: boolean) => void
}

console.log(() => {
  useEffect(allProject)
})

const ProjectList = ({
  isLoading,
  allProject,
  setSelectedID,
  setOpenModal,
}: ProjectListProps) => {
  useEffect(() => {
    console.log(allProject)
  }, [allProject])

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
        <div className="w-full text-center text-xl text-gray mt-32">
          등록된 프로젝트가 없습니다.
        </div>
      )}
    </>
  )
}

export default ProjectList
