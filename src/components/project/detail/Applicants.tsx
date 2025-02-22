'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
interface Applicant {
  id: number
  name: string
  isLeader: boolean
  teamRole: string
  summary: string
  status: string
  profileImage: string
  year: number
}

interface ApplicantsProps {
  projectType: string
  applicants: Applicant[]
  onOpen?: (applicant: Applicant) => void
}

function Box({
  name,
  year,
  position,
  profileImage,
  onClick,
}: {
  name: string
  year: number
  position: string
  profileImage?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-[19rem] h-[2.75rem] p-2 bg-gray-100 hover:bg-[#F5F5F5]"
    >
      <div className="flex items-center">
        <Image
          src={profileImage || '/default-profile.png'}
          width={36}
          height={36}
          alt="Picture"
          className="border rounded-lg mr-[0.75rem]"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold">{name}</p>
          <p className="text-[#7B7B7B] text-sm">{year}기</p>
        </div>
      </div>
      <div className="bg-lightblue text-blue px-3 py-1 rounded-md text-sm ">
        {position}
      </div>
    </div>
  )
}

export default function Applicants({
  projectType,
  applicants,
  onOpen,
}: any) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mt-[1rem]">
      {/* 드롭다운 버튼 */}
      <div
        role="button"
        onClick={toggleDropdown}
        className="w-[19rem] gap-32 px-[1.63rem] h-[2.4375rem] flex items-center bg-white rounded-lg shadow-md border border-primary cursor-pointer"
      >
        {projectType === 'study' ? '스터디 지원자' : '프로젝트 지원자'}
        {isOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
      </div>
      {/* 드롭다운 내용 */}
      <div
        className={`${
          isOpen ? 'max-h-60' : 'max-h-0'
        } overflow-y-auto transition-max-height duration-500 ease-in-out w-[19rem] mt-3 flex flex-col gap-2 shadow-bgshadow rounded-[0.63rem]`}
      >
        {applicants?.length === 0 ? (
          <div className="p-4 text-center text-gray-700">지원자가 없습니다</div>
        ) : (
          applicants?.map((applicant) => (
            <Box
              key={applicant.id}
              name={applicant.name} // <-- userName 필드
              year={applicant.year}
              position={applicant.teamRole || '미지정'}
              profileImage={applicant.profileImage}
              onClick={() => onOpen(applicant)}
            />
          ))
        )}
      </div>
    </div>
  )
}
