'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import MemberBox from './BigMemberBox'
import SmallMemberBox from './SmallMemberBox'
import { useRouter } from 'next/navigation'

interface Member {
  name: string
  generation: string
  imageSrc: string | null
}

interface MemberModalProps {
  initialMembers: Member[]
}

const MemberModal = ({ initialMembers }: MemberModalProps) => {
  const dropDownRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [dropdownOptions, setDropdownOptions] =
    useState<Member[]>(initialMembers)

  const [projectType, setProjectType] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  // 이름 검색
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // 바깥 클릭 시 드롭다운 접기
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

        {/* 이름 입력 필드 (고정) */}
        <div className="mb-4">
          <p className="text-left mb-2">이름을 입력해주세요</p>
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

        {/* 멤버 리스트 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto mb-6">
          <div className="flex flex-wrap overflow-x-hidden gap-2">
            {members.length > 0 ? (
              members.map((member, index) =>
                projectType === 'project' ? (
                  <MemberBox
                    key={member.name} //추후 member.id로 교체 예정
                    name={member.name}
                    generation={member.generation}
                    imageSrc={member.imageSrc || '/default-profile.png'}
                    onClose={() => handleRemoveMember(member.name)}
                  />
                ) : (
                  <SmallMemberBox
                    key={member.name} //추후 member.id로 교체 예정
                    name={member.name}
                    generation={member.generation}
                    imageSrc={member.imageSrc || '/default-profile.png'}
                    onClose={() => handleRemoveMember(member.name)}
                  />
                ),
              )
            ) : (
              <p className="text-center text-gray-500 w-full">
                아직 추가된 멤버가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
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
