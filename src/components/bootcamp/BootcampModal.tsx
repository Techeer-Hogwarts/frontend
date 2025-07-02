import React, { useState } from 'react'
import Image from 'next/image'
import RegistModal from './RegistModal'
import { bootcampProjectDetail } from '@/constants/bootcamp'
import ModalHeader from './BootcampModal/ModalHeader'
import ProjectIntroduce from './BootcampModal/ProjectIntroduce'
import ProjectTeam from './BootcampModal/ProjectTeam'
import ModalFooter from './BootcampModal/ModalFooter'
import { useGetBootcampDetail } from '@/hooks/bootcamp/useGetBootcampDetail'
import { useEffect } from 'react'

interface BootcampModalProps {
  id: number
  onClose: () => void
}

const BootcampModal = ({ id, onClose }: BootcampModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { data: project } = useGetBootcampDetail(id)
  if (!project) return null
  const isWebm = project.imageUrl.includes('/0webm/')

  if (isEditing) {
    return (
      <RegistModal
        mode="edit"
        onClose={() => setIsEditing(false)}
        initialData={project}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="bg-white fixed top-1/2 left-1/2 w-[600px] h-[730px] z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border-lightgray border-2 flex flex-col items-center p-5 realtive gap-5">
        <ModalHeader
          ProjectDetail={project}
          setIsEditing={setIsEditing}
          onClose={onClose}
        />
        <div className="border-b border-lightgray w-full"></div>
        <section className="h-[270px] w-[500px] relative">
          {isWebm ? (
            <video
              src={typeof project.imageUrl === 'string' ? project.imageUrl : ''}
              className="rounded-xl object-contain w-full h-full"
              controls
              autoPlay
              loop
              muted
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src={typeof project.imageUrl === 'string' ? project.imageUrl : ''}
              alt="bootcamp project image"
              fill
              className="rounded-xl object-contain"
              sizes="50vw"
            />
          )}
        </section>
        <section className="w-[500px] flex flex-col gap-5">
          <ProjectIntroduce ProjectDetail={project} />
          <ProjectTeam ProjectDetail={project} />
          <ModalFooter ProjectDetail={project} />
        </section>
      </div>
    </div>
  )
}

export default BootcampModal
