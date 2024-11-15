'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import MemberBox from './BigMemberBox'
import SmallMemberBox from './SmallMemberBox'

interface Member {
  name: string
  generation: string
  imageSrc?: string
}

interface MemberModalProps {
  initialMembers: Member[]
  closeModal: () => void
}

const MemberModal = ({ initialMembers, closeModal }: MemberModalProps) => {
  const dropDownRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [name, setName] = useState('')
  const [isProject, setIsProject] = useState(false) // 프로젝트 여부 상태 추가
  const [members, setMembers] = useState<Member[]>([])
  const [dropdownOptions, setDropdownOptions] = useState<Member[]>([
    { name: '홍길동', generation: '8기', imageSrc: '/profile1.png' },
    { name: '김철수', generation: '8기', imageSrc: '/profile2.png' },
    { name: '이영희', generation: '8기', imageSrc: '/profile3.png' },
    { name: '박민수', generation: '8기', imageSrc: '/profile4.png' },
    { name: '최수지', generation: '8기', imageSrc: '/profile5.png' },
  ])

  // 로컬 스토리지에서 projectType 확인
  useEffect(() => {
    const projectType = localStorage.getItem('projectType')
    setIsProject(projectType === 'project')
  }, [])

  // 이름 검색
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // 바깥 클릭시 드롭다운 접기
  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (!dropDownRef.current?.contains(e.target as Node))
        setIsDropdownOpen(false)
    }
    if (!isDropdownOpen) return
    document.addEventListener('click', outSideClick)
    return () => {
      document.removeEventListener('click', outSideClick)
    }
  }, [isDropdownOpen])

  // 멤버 추가
  const handleAddMember = (member: Member) => {
    if (!members.find((m) => m.name === member.name)) {
      setMembers((prevMembers) => [...prevMembers, member])
    }
    setIsDropdownOpen(false)
  }

  // 멤버 삭제
  const handleRemoveMember = (name: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.name !== name),
    )
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[30.375rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          프로젝트 팀원 추가
        </p>
        <div className="mb-6">
          <p className="text-left mb-3">이름을 입력해주세요</p>

          <input
            type="text"
            className="w-full h-[2rem] border border-gray rounded-sm"
            value={name}
            onChange={handleName}
            onClick={() => {
              setIsDropdownOpen((prev) => !prev)
            }}
            ref={dropDownRef}
          />
          {isDropdownOpen && (
            <div className="absolute w-[26.25rem] bg-white border border-gray mt-1 max-h-48 overflow-y-auto z-10">
              {dropdownOptions?.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-lightprimary"
                  onClick={() => handleAddMember(member)}
                >
                  <Image
                    src={member.imageSrc || '/default-profile.png'}
                    alt="Profile"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-md bg-lightpink"
                  />
                  <div className="flex gap-3 items-center">
                    <p>{member.name}</p>
                    <p className="text-gray text-xs">{member.generation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap w-full h-[25.06rem] overflow-y-auto gap-2">
          {members.length > 0 ? (
            members?.map((member, index) =>
              isProject ? (
                <MemberBox
                  key={index}
                  name={member.name}
                  generation={member.generation}
                  imageSrc={member.imageSrc || '/default-profile.png'}
                  onClose={() => handleRemoveMember(member.name)}
                />
              ) : (
                <SmallMemberBox
                  key={index}
                  name={member.name}
                  generation={member.generation}
                  imageSrc={member.imageSrc || '/default-profile.png'}
                  onClose={() => handleRemoveMember(member.name)}
                />
              ),
            )
          ) : (
              <p className="text-center text-gray-500  w-full">
                아직 추가된 멤버가 없습니다.
              </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-[200px] rounded-md text-sm h-[34px] ${
              members.length > 0 ? 'bg-primary text-white' : 'bg-lightgray'
            }`}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberModal
