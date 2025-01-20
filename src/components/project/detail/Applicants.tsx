'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'

interface Applicant {
  id: number
  name: string
  email: string
  num: number
  status: string
  summary: string
  userId: number
  isLeader: boolean
  position: string
  profileImage?: string | null
}

interface ApplicantsProps {
  applicants: Applicant[]
  onOpen: () => void
}
const members = [
  {
    id: 10,
    createdAt: '2025-01-20T01:42:14.900Z',
    updatedAt: '2025-01-20T01:42:14.900Z',
    isDeleted: false,
    isLeader: false,
    studyTeamId: 4,
    summary: '스터디에 참여하고 싶습니다!',
    status: 'PENDING',
    userId: 2,
    num: 8,
    position: 'Frontend',
    user: {
      name: '주영준',
      email: 'yeongjun0129@gmail.com',
      profileImage: '',
    },
  },
  {
    id: 11,
    createdAt: '2025-01-20T01:42:14.900Z',
    updatedAt: '2025-01-20T01:42:14.900Z',
    isDeleted: false,
    isLeader: false,
    studyTeamId: 4,
    summary: '스터디에 참여하고 싶습니다!',
    status: 'PENDING',
    userId: 2,
    num: 9,
    position: 'Backend',
    user: {
      name: '1',
      email: 'yeongjun0129@gmail.com',
      profileImage: '',
    },
  },
  {
    id: 12,
    createdAt: '2025-01-20T01:42:14.900Z',
    updatedAt: '2025-01-20T01:42:14.900Z',
    isDeleted: false,
    isLeader: false,
    studyTeamId: 4,
    summary: '스터디에 참여하고 싶습니다!',
    status: 'PENDING',
    userId: 2,
    num: 10,
    position: 'Frontend',
    user: {
      name: '2',
      email: 'yeongjun0129@gmail.com',
      profileImage: '',
    },
  },
]

function Box({
  name,
  num,
  position,
  profileImage,
  onClick,
}: {
  name: string
  num: number
  position: string
  profileImage?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-[18rem] h-[2.75rem] p-2 bg-gray-100 hover:bg-[#F5F5F5]"
    >
      <div className="flex items-center">
        <Image
          src={profileImage || '/default-profile.png'}
          width={42}
          height={42}
          alt="Picture"
          className="border rounded-sm mr-[0.75rem]"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold">{name}</p>
          <p className="text-[#7B7B7B] text-sm">{num}</p>
        </div>
      </div>
      <div className="bg-lightblue text-blue px-3 py-1 rounded-md text-sm ">
        {position}
      </div>
    </div>
  )
}

export default function Applicants({ applicants, onOpen }: ApplicantsProps) {
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
        스터디 지원자
        {isOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
      </div>
      {/* 드롭다운 내용 */}
      <div
        className={`${
          isOpen ? 'max-h-60' : 'max-h-0'
        } overflow-y-auto transition-max-height duration-500 ease-in-out w-[19rem] mt-3 flex flex-col gap-2 shadow-bgshadow rounded-[0.63rem]`}
      >
        {/* {applicants.map((applicant) => (
          <Box
            key={applicant.id}
            name={applicant.user.name}
            // num={applicant.status} //기수 추가 수정 예정
            // position={applicant.user.position} //포지션 추가 수정 예정
            profileImage={applicant.user.profileImage} // 이미지 추가 수정 예정
          />
        ))} */}
        {members.map((applicant) => (
          <Box
            key={applicant.id}
            name={applicant.user.name}
            num={applicant.num} //기수 추가 수정 예정
            position={applicant.position} //포지션 추가 수정 예정
            profileImage={applicant.user.profileImage} // 이미지 추가 수정 예정
            onClick={onOpen}
          />
        ))}
      </div>
    </div>
  )
}
