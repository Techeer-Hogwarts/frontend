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
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
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
    imageUrl: initialData?.imageUrl || null,
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
    const requiredFields = [
      { key: 'name', label: '프로젝트 제목' },
      { key: 'projectExplain', label: '프로젝트 소개' },
      { key: 'team', label: '팀명' },
      { key: 'githubUrl', label: 'GitHub 링크' },
      { key: 'mediumUrl', label: 'Medium 링크' },
      { key: 'webUrl', label: '웹사이트 링크' },
    ]

    for (const field of requiredFields) {
      if (!formData[field.key as keyof typeof formData]) {
        alert(`${field.label}을(를) 입력해주세요.`)
        return
      }
    }

    if (members.length === 0) {
      alert('팀원을 한 명 이상 추가해주세요.')
      return
    }

    if (!formData.imageUrl) {
      alert('이미지를 업로드해주세요.')
      return
    }

    try {
      const cleanedMembers = members
        .filter(
          (member): member is BootcampMemberType => !!member && !!member.userId,
        )
        .map(({ userId, position, isLeader }) => ({
          userId,
          position,
          isLeader,
        }))

      const requestData = {
        ...formData,
        members: cleanedMembers,
      }

      if (mode === 'register') {
        await createBootcamp(requestData)
      } else if (mode === 'edit' && initialData?.id) {
        await updateBootcamp(initialData.id, requestData)
        queryClient.invalidateQueries({
          queryKey: ['bootcampDetail', initialData.id],
        })
      }

      queryClient.invalidateQueries({ queryKey: ['bootcampList'] })
      onClose()
    } catch (err) {
      console.error('에러 발생:', err)
    }
  }

  const handleSetMembers = (updated: BootcampMemberType[]) => {
    setMembers(updated)
    setFormData((prev) => ({
      ...prev,
      members: updated,
    }))
  }

  return (
    <>
      {IsModalOpen ? (
        <AddmemberModal
          onClose={() => setIsModalOpen(false)}
          setMembers={handleSetMembers}
          initialMembers={members}
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
