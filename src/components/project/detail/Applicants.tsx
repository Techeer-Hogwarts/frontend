// components/Applicants.tsx

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
import { getPositionStyle } from '@/styles/positionStyles'

interface Applicant {
  id: number
  userId?: number
  name: string
  isLeader: boolean
  teamRole: string
  summary: string
  status: string
  profileImage: string
  year: number
}

interface ApplicantsProps {
  /** 'project' 또는 'study' 모드 지정 */
  variant: 'project' | 'study'
  /** 지원자 목록 */
  applicants: Applicant[]
  /** 상세 보기 콜백 */
  onOpen?: (applicant: Applicant) => void
}

export default function Applicants({
  variant,
  applicants,
  onOpen,
}: ApplicantsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen((open) => !open)

  const title = variant === 'study' ? '스터디 지원자' : '프로젝트 지원자'

  return (
    <div className="mt-[1rem]">
      {/* 드롭다운 버튼 */}
      <div
        role="button"
        onClick={toggleDropdown}
        className="w-[19rem] gap-32 px-[1.63rem] h-[2.4375rem] flex items-center bg-white rounded-lg shadow-md border border-primary cursor-pointer"
      >
        {title}
        {isOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
      </div>

      {/* 드롭다운 내용 */}
      <div
        className={`${
          isOpen ? 'max-h-60' : 'max-h-0'
        } overflow-y-auto transition-max-height duration-500 ease-in-out w-[19rem] mt-3 flex flex-col gap-2 shadow-bgshadow rounded-[0.63rem]`}
      >
        {applicants.length === 0 ? (
          <div className="p-4 text-center text-gray-700">지원자가 없습니다</div>
        ) : (
          applicants.map((applicant) => (
            <Box
              key={applicant.id}
              applicant={applicant}
              variant={variant}
              onClick={() => onOpen?.(applicant)}
            />
          ))
        )}
      </div>
    </div>
  )
}

interface BoxProps {
  applicant: Applicant
  variant: 'project' | 'study'
  onClick?: () => void
}

function Box({ applicant, variant, onClick }: BoxProps) {
  const { name, year, teamRole, profileImage } = applicant
  const label = `${year}기`

  // 프로젝트 모드에서는 getPositionStyle 사용, 스터디는 기본 스타일
  const role = teamRole || '미지정'
  const styleClasses =
    variant === 'project'
      ? (() => {
          const { bg, textColor } = getPositionStyle(role)
          return `${bg} ${textColor}`
        })()
      : 'bg-lightblue text-blue'

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-[19rem] h-[2.75rem] p-2 hover:bg-[#F5F5F5] cursor-pointer"
    >
      <div className="flex items-center">
        <Image
          src={profileImage || '/default-profile.png'}
          width={36}
          height={36}
          alt="Profile"
          className="border rounded-lg mr-[0.75rem] w-[36px] h-[36px] object-cover"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold">{name}</p>
          <p className="text-[#7B7B7B] text-sm">{label}</p>
        </div>
      </div>
      <div className={`${styleClasses} px-3 py-1 rounded-md text-sm`}>
        {role}
      </div>
    </div>
  )
}
