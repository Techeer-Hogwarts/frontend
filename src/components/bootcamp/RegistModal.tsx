'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Git from '@/../public/git.svg'
import Medium from '@/../public/medium.svg'
import Link from '@/../public/link.svg'

interface RegistModalProps {
  onClose: () => void
}

const RegistModal: React.FC<RegistModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    team: '',
    members: {
      BE: [] as string[],
      FE: [] as string[],
      DEV: [] as string[],
    },
    github: '',
    medium: '',
    service: '',
    image: null as File | null,
  })
  const [inputMembers, setInputMembers] = useState({
    BE: '',
    FE: '',
    DEV: '',
  })

  const handleChange = (field: string, value: string) => {
    if (['BE', 'FE', 'DEV'].includes(field)) {
      setFormData((prev) => ({
        ...prev,
        members: {
          ...prev.members,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleMemberInputChange = (
    role: 'BE' | 'FE' | 'DEV',
    value: string,
  ) => {
    setInputMembers((prev) => ({ ...prev, [role]: value }))
  }

  const handleAddMember = (role: 'BE' | 'FE' | 'DEV') => {
    const trimmed = inputMembers[role].trim()
    if (!trimmed) return
    setFormData((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        [role]: [...prev.members[role], trimmed],
      },
    }))
    setInputMembers((prev) => ({ ...prev, [role]: '' }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = () => {
    console.log('제출 데이터:', formData)
    // 여기에 제출 로직 추가
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="bg-white fixed top-1/2 left-1/2 w-[600px] max-h-[90vh] overflow-y-auto z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-lightgray p-6 flex flex-col gap-6">
        <header className="relative flex justify-end items-center w-full">
          <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
            프로젝트 등록
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
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
            placeholder="프로젝트명을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">소개</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md resize-none h-[80px]"
            placeholder="프로젝트 소개를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">팀 알파벳</label>
          <input
            type="text"
            value={formData.team}
            onChange={(e) => handleChange('team', e.target.value)}
            className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
            placeholder="예:A"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">
            포지션별 인원
          </label>
          <div className="flex gap-4 flex-col justify-between">
            {(['BE', 'FE', 'DEV'] as const).map((role) => (
              <div key={role} className="flex flex-col w-full">
                <label className="text-sm font-semibold mb-1 text-primary">
                  {role}
                </label>
                <input
                  type="text"
                  value={inputMembers[role]}
                  onChange={(e) =>
                    handleMemberInputChange(role, e.target.value)
                  }
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddMember(role)
                    }
                  }}
                  className="border-lightgray border-2 p-2 rounded-md w-full max-w-[200px] flex-shrink-0"
                  placeholder="이름 입력 후 Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.members[role].map((name, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full border border-lightgray"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            members: {
                              ...prev.members,
                              [role]: prev.members[role].filter(
                                (_, i) => i !== index,
                              ),
                            },
                          }))
                        }}
                        className="text-gray-500 hover:text-red-500 text-xs font-bold"
                        aria-label="이 멤버 삭제"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

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
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                placeholder="GitHub URL"
              />
            </div>
            <div className="flex items-center gap-2">
              <Medium />
              <input
                type="text"
                value={formData.medium}
                onChange={(e) => handleChange('medium', e.target.value)}
                className="w-full border-lightgray border-2 px-3 py-2 rounded-md"
                placeholder="Medium URL"
              />
            </div>
            <div className="flex items-center gap-2">
              <Link />
              <input
                type="text"
                value={formData.service}
                onChange={(e) => handleChange('service', e.target.value)}
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
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistModal
