'use client'

import React, { useEffect, useState } from 'react'
import ProjectMemberModal from '../project/modal/ProjectModal'
import {
  BootcampDetailType,
  BootcampMemberType,
} from '@/types/bootcamp/bootcamp'
import ModalHeader from './RegistModal/ModalHeader'
import ProjectTitleInput from './RegistModal/ProjectTitleInput'
import ProjectExplain from './RegistModal/ProjectExplain'
import ProjectTeamName from './RegistModal/ProjectTeamName'
import ProjectImage from './RegistModal/ProjectImage'
import ProjectLinkInput from './RegistModal/ProjectLinkInput'
import ProjectSave from './RegistModal/ProjectSave'
import ProjectMembers from './RegistModal/ProjectMembers'
import AddmemberModal from './AddMemberModal'
import { createBootcamp } from '@/api/bootcamp/createBootcamp'
import { updateBootcamp } from '@/api/bootcamp/updateBootcamp'

interface RegistModalProps {
  onClose: () => void
  mode?: 'register' | 'edit'
  initialData?: BootcampDetailType
}

const RegistModal: React.FC<RegistModalProps> = ({
  onClose,
  mode = 'register',
  initialData,
}) => {
  const [members, setMembers] = useState<BootcampMemberType[]>(
    initialData?.members || [],
  )
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    projectExplain: initialData?.projectExplain || '',
    team: initialData?.team || '',
    members: initialData?.members || [],
    githubUrl: initialData?.githubUrl || '',
    mediumUrl: initialData?.mediumUrl || '',
    webUrl: initialData?.webUrl || '',
    imageUrl:
      initialData?.imageUrl instanceof File ? initialData.imageUrl : null,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, imageUrl: file }))
  }
  const handleSubmit = async () => {
    try {
      const requestData = {
        ...formData,
        members,
      }

      if (mode === 'register') {
        await createBootcamp(requestData)
      } else if (mode === 'edit' && initialData?.id) {
        await updateBootcamp(initialData.id, requestData)
      }

      onClose()
    } catch (err) {
      console.error('에러 발생:', err)
    }
  }

  return (
    <>
      {IsModalOpen ? (
        <AddmemberModal
          onClose={() => setIsModalOpen(false)}
          setMembers={setMembers}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-white fixed top-1/2 left-1/2 w-[600px] max-h-[90vh] overflow-y-auto z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-lightgray p-6 flex flex-col gap-10">
            <ModalHeader mode={mode} onClose={onClose} />
            <ProjectTitleInput
              formData={formData}
              handleChange={handleChange}
            />
            <ProjectExplain formData={formData} handleChange={handleChange} />
            <ProjectTeamName formData={formData} handleChange={handleChange} />
            <ProjectMembers members={members} setIsModalOpen={setIsModalOpen} />
            <ProjectImage
              formData={formData}
              handleFileChange={handleFileChange}
            />
            <ProjectLinkInput formData={formData} handleChange={handleChange} />
            <ProjectSave
              mode={mode}
              onClose={onClose}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default RegistModal
