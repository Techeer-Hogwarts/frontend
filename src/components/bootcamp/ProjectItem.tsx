import React from 'react'
import Image from 'next/image'

interface ProjectItemProps {
  bootcamp: {
    id: number
    image_url: string
    rank: number
  }
  setSelectedID: (id: number) => void
  setOpenModal: (open: boolean) => void
}

const ProjectItem = ({
  bootcamp,
  setSelectedID,
  setOpenModal,
}: ProjectItemProps) => {
  return (
    <div key={bootcamp.id} className="relative">
      <button
        onClick={() => {
          setSelectedID(bootcamp.id)
          setOpenModal(true)
        }}
      >
        <Image
          src={bootcamp.image_url}
          alt="bootcamp project Image"
          width={300}
          height={200}
          className="rounded-lg shadow-xl"
        />

        {bootcamp.rank === 1 && (
          <Image
            src="/images/bootcamp/1st-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-2 z-10"
          />
        )}

        {bootcamp.rank === 2 && (
          <Image
            src="/images/bootcamp/2nd-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-2 z-10"
          />
        )}

        {bootcamp.rank === 3 && (
          <Image
            src="/images/bootcamp/3rd-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-2 z-10"
          />
        )}
      </button>
    </div>
  )
}

export default ProjectItem
