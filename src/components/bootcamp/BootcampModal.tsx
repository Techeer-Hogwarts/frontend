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
  const isWebm = project.imageUrl.includes('webm')

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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-white w-full max-w-7xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-4/5 bg-black flex items-center justify-center p-0 relative min-h-[300px] md:min-h-full">
          {isWebm ? (
            <video
              src={typeof project.imageUrl === 'string' ? project.imageUrl : ''}
              className="w-full h-full object-contain"
              controls
              autoPlay
              loop
              muted
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={
                  typeof project.imageUrl === 'string' ? project.imageUrl : ''
                }
                alt="bootcamp project image"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 flex flex-col h-full bg-white relative">
          <div className="p-6 pb-2 border-b border-gray-100 flex-shrink-0">
            <ModalHeader
              ProjectDetail={project}
              setIsEditing={setIsEditing}
              onClose={onClose}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <ProjectIntroduce ProjectDetail={project} />
            <div className="border-t border-zinc-300 my-2" />
            <ProjectTeam ProjectDetail={project} />
          </div>

          <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <ModalFooter ProjectDetail={project} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BootcampModal
