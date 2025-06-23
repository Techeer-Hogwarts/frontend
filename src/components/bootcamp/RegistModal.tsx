'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Link from '@/../public/link.svg'
import ProjectMemberModal from '../project/modal/ProjectModal'
import { IoClose } from 'react-icons/io5'

interface RegistModalProps {
  onClose: () => void
  mode?: 'register' | 'edit'
  initialData?: {
    name: string
    project_explain: string
    team: string
    members: Member[]
    github_url: string
    medium_url: string
    web_url: string
    image_url: string | Blob
  }
}

const RegistModal: React.FC<RegistModalProps> = ({
  onClose,
  mode = 'register',
  initialData,
}) => {
  const [members, setMembers] = useState([])
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    project_explain: initialData?.project_explain || '',
    team: initialData?.team || '',
    members: initialData?.members || [],
    github_url: initialData?.github_url || '',
    medium_url: initialData?.medium_url || '',
    web_url: initialData?.web_url || '',
    image:
      initialData?.image_url instanceof File ? initialData.image_url : null,
  })

  useEffect(() => {
    console.log(members)
    console.log(formData)
  }, [members])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSaveMembers = (selectedMembers: []) => {
    setMembers(selectedMembers)
    const formattedMembers = selectedMembers.map((member) => ({
      user_id: member.id,
      position: member.teamRole,
    }))

    setFormData((prev) => ({
      ...prev,
      members: formattedMembers,
    }))
    setIsModalOpen(false)
  }

  const handleRemoveMember = (id: number) => {
    const updatedMembers = members.filter((member) => member.id !== id)
    setMembers(updatedMembers)
    const formattedMembers = updatedMembers.map((member) => ({
      user_id: member.id,
      position: member.teamRole,
    }))
    setFormData((prev) => ({
      ...prev,
      members: formattedMembers,
    }))
  }

  return (
    <>
      {IsModalOpen ? (
        <ProjectMemberModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveMembers}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-white fixed top-1/2 left-1/2 w-[600px] max-h-[90vh] overflow-y-auto z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-lightgray p-6 flex flex-col gap-10">
            <header className="relative flex justify-end items-center w-full">
              <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
                {mode === 'edit' ? '프로젝트 수정' : '프로젝트 등록'}
              </div>
              <button onClick={onClose} className="text-xl font-bold">
                ×
              </button>
            </header>
            <div className="border-lightgray border-t"></div>

            <div>
              <label className="block text-lg font-medium mb-1">
                프로젝트 제목
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                placeholder="프로젝트명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1">소개</label>
              <textarea
                value={formData.project_explain}
                onChange={(e) =>
                  handleChange('project_explain', e.target.value)
                }
                className="w-full border-lightgray border-2 px-3 py-2 rounded-md resize-none h-[80px]"
                placeholder="프로젝트 소개를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-1">
                팀 알파벳
              </label>
              <input
                type="text"
                value={formData.team}
                onChange={(e) => handleChange('team', e.target.value)}
                className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                placeholder="A"
              />
            </div>

            <section>
              <div className="flex flex-row items-center gap-2 mb-5">
                <label className="block text-lg font-medium">포지션 인원</label>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border border-lightgray text-gray rounded-md p-1 text-xs shadow-sm hover:shadow-[0px_0px_4px_1px_rgba(138,138,138,0.73)]"
                >
                  +
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                  <p className="font-bold text-xl text-primary">Leader</p>
                  <p className="flex gap-2 flex-wrap">
                    {members
                      .filter((member) => member.isLeader)
                      .map((member) => (
                        <span
                          key={member.id}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                        >
                          {member.name}
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                  </p>
                </div>
                <div className="flex gap-5">
                  <p className="font-bold text-xl text-primary">FE</p>
                  <p className="flex gap-2 flex-wrap">
                    {members
                      .filter((member) => member.teamRole == 'FRONTEND')
                      .map((member) => (
                        <span
                          key={member.id}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                        >
                          {member.name}
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                  </p>
                </div>
                <div className="flex gap-5">
                  <p className="font-bold text-xl text-primary">BE</p>
                  <p className="flex gap-2 w-[100px] flex-wrap">
                    {members
                      .filter((member) => member.teamRole == 'BACKEND')
                      .map((member) => (
                        <span
                          key={member.id}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-gray"
                        >
                          {member.name}
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </section>

            <div>
              <label className="block text-lg font-medium mb-2">
                프로젝트 대표 이미지
              </label>
              <div className="flex flex-col gap-2 items-center">
                <label htmlFor="image-upload" className="cursor-pointer w-fit">
                  <Image
                    src={
                      formData.image
                        ? URL.createObjectURL(formData.image)
                        : '/images/bootcamp/placeholder.svg'
                    }
                    alt="이미지 업로드"
                    width={500}
                    height={500}
                  />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {formData.image && (
                  <p className="text-xs text-gray-600 mt-1">
                    선택된 파일: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">링크</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Git />
                  <input
                    type="text"
                    value={formData.github_url}
                    onChange={(e) => handleChange('github_url', e.target.value)}
                    className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Medium />
                  <input
                    type="text"
                    value={formData.medium_url}
                    onChange={(e) => handleChange('medium_url', e.target.value)}
                    className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                    placeholder="Medium URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Link />
                  <input
                    type="text"
                    value={formData.web_url}
                    onChange={(e) => handleChange('web_url', e.target.value)}
                    className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                    placeholder="서비스 URL"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80"
              >
                {mode === 'edit' ? '수정' : '등록'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RegistModal
