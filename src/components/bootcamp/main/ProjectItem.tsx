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
  const isWebm = bootcamp.imageUrl.includes('webm')
  return (
    <div
      key={bootcamp.id}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        setSelectedID(bootcamp.id)
        setOpenModal(true)
      }}
    >
      <div className="w-full h-full relative overflow-hidden rounded-2xl">
        {isWebm ? (
          <video
            src={bootcamp.imageUrl}
            muted
            loop
            playsInline
            className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Image
            src={bootcamp.imageUrl}
            alt="bootcamp project Image"
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-20">
          <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-lg px-6 py-2 border-2 border-white rounded-full transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            View Project
          </span>
        </div>
      </div>

      {bootcamp.rank > 0 && bootcamp.rank <= 3 && (
        <div className="absolute top-0 right-4 drop-shadow-lg">
          <Image
            src={
              bootcamp.rank === 1
                ? '/images/bootcamp/1st-place-medal.svg'
                : bootcamp.rank === 2
                  ? '/images/bootcamp/2nd-place-medal.svg'
                  : '/images/bootcamp/3rd-place-medal.svg'
            }
            alt={`${bootcamp.rank}st place`}
            width={60}
            height={60}
          />
        </div>
      )}

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-sm font-bold text-darkgray">
        {bootcamp.year}기
      </div>
    </div>
  )
}

export default ProjectItem
