'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import MemberBox from './BigMemberBox'
import { useRouter } from 'next/navigation'

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
  const [filteredOptions, setFilteredOptions] =
    useState<Member[]>(initialMembers)

  const router = useRouter
  const handleBack = () => {
    // router.back()
  }

  // 이름 검색 필터링
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    const filtered = initialMembers.filter((member) =>
      member.name.includes(value),
    )
    setFilteredOptions(filtered)
    setIsDropdownOpen(true)
  }

  // 바깥 클릭 시 드롭다운 닫기
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

  const [members, setMembers] = useState<Member[]>([])

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
          스터디 팀원 추가
        </p>
        <div className="mb-6">
          <p className="text-left mb-3">이름을 입력해주세요</p>

          <input
            type="text"
            className="w-full h-[2rem] border border-gray rounded-sm"
            value={name}
            onChange={handleName}
            onFocus={() => setIsDropdownOpen(true)}
            ref={dropDownRef}
          />
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray mt-1 max-h-48 overflow-y-auto z-10">
              {filteredOptions.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-lightprimary"
                  onClick={() => handleAddMember(member)}
                >
                  <Image
                    src={member.imageSrc || '/'}
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
        <div className="flex flex-col w-full h-[25.06rem] overflow-y-auto gap-2">
          {members.length > 0 ? (
            members.map((member, index) => (
              <MemberBox
                key={index}
                name={member.name}
                generation={member.generation}
                imageSrc={member.imageSrc || '/default-profile.png'}
                onClose={() => handleRemoveMember(member.name)}
                isLeader={member.name === '홍길동'} // 조건에 따라 Leader 표시
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              아직 추가된 멤버가 없습니다.
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            onClick={closeModal}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray "
          >
            취소
          </button>
          <button
            type="submit"
            className={`w-[200px] rounded-md text-sm h-[34px] text-white ${members.length > 0 ? 'bg-primary text-white' : 'bg-lightgray'}`}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberModal
