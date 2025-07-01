import React from 'react'
import Image from 'next/image'

interface ProjectItemProps {
  bootcamp: {
    id: number
    year: number
    imageUrl: string
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
    <div
      key={bootcamp.id}
      className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-md border border-gray hover:shadow-2xl transition duration-300 transform hover:scale-105 p-1"
    >
      <button
        onClick={() => {
          setSelectedID(bootcamp.id)
          setOpenModal(true)
        }}
        className="w-full h-full relative cursor-pointer rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400"
      >
        <Image
          src={bootcamp.imageUrl}
          alt="bootcamp project Image"
          fill
          className="object-cover object-top rounded-2xl"
          sizes="20vw"
        />

        {bootcamp.rank === 1 && (
          <Image
            src="/images/bootcamp/1st-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-4 z-10 opacity-90 drop-shadow-md"
          />
        )}

        {bootcamp.rank === 2 && (
          <Image
            src="/images/bootcamp/2nd-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-4 z-10 opacity-90 drop-shadow-md"
          />
        )}

        {bootcamp.rank === 3 && (
          <Image
            src="/images/bootcamp/3rd-place-medal.svg"
            alt="Gold Medal"
            width={60}
            height={60}
            className="absolute top-0 right-4 z-10 opacity-90 drop-shadow-md"
          />
        )}
      </button>
    </div>
  )
}

export default ProjectItem
