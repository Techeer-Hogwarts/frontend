'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import BigMemberBox from './BigMemberBox'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/api/project/common'

interface Member {
  id: number
  name: string
  year: number
  profileImage?: string | null
  isLeader: boolean
  teamRole?: string
}

interface MemberModalProps {
  onClose: () => void
  onSave: (selectedMembers: Member[]) => void
}

export default function ProjectMemberModal({
  onClose,
  onSave,
}: MemberModalProps) {
  const dropDownRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [name, setName] = useState('')
  const [members, setMembers] = useState<Member[]>([])

  const { data: allUsers } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: getAllUsers,
  })

  // 입력 필드 onChange
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
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

  // 드롭다운용 필터
  const filteredUsers = allUsers?.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  )

  // 멤버 추가
  const handleAddMember = (member: Member) => {
    if (!members.some((m) => m.id === member.id)) {
      setMembers((prev) => [...prev, { ...member, isLeader: false }])
    }
    setIsDropdownOpen(false)
  }

  // 멤버 삭제
  const handleRemoveMember = (memberName: string) => {
    setMembers((prev) => prev.filter((m) => m.name !== memberName))
  }

  // 리더 토글 & 팀 역할 업데이트
  const handleUpdateMember = (
    id: number,
    newIsLeader: boolean,
    newRole: string,
  ) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isLeader: newIsLeader, teamRole: newRole } : m,
      ),
    )
  }

  // 저장 버튼
  const handleSave = () => {
    onSave(members)
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-7 w-[36rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          프로젝트 팀원 추가
        </p>

        {/* 이름 입력 */}
        <div className="mb-6">
          <p className="text-left mb-3">이름을 입력해주세요</p>
          <input
            type="text"
            className="w-full h-[2rem] border border-gray rounded-sm px-2 focus:outline-none"
            value={name}
            onChange={handleName}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            ref={dropDownRef}
          />

          {isDropdownOpen && filteredUsers && filteredUsers.length > 0 && (
            <div
              className="absolute w-[32.375rem] bg-white border border-gray mt-1 max-h-48 overflow-y-auto z-10 rounded-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
              }}
            >
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-lightprimary"
                  onClick={() => handleAddMember(user)}
                >
                  <Image
                    src={user.profileImage || '/default-profile.png'}
                    alt="Profile"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-md bg-lightpink"
                  />
                  <div className="flex gap-3 items-center">
                    <p>{user.name}</p>
                    <p className="text-gray text-xs">{user.year}기</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 멤버 목록 */}
        <div
          className="flex-1 overflow-y-auto mb-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
          }}
        >
          <div className="flex flex-col gap-2">
            {members.length > 0 ? (
              members.map((member) => (
                <BigMemberBox
                  key={member.id}
                  name={member.name}
                  year={member.year}
                  imageSrc={member.profileImage || '/default-profile.png'}
                  isLeader={member.isLeader}
                  teamRole={member.teamRole}
                  onClose={() => handleRemoveMember(member.name)}
                  onUpdate={(newIsLeader, newRole) =>
                    handleUpdateMember(member.id, newIsLeader, newRole)
                  }
                />
              ))
            ) : (
              <p className="text-center text-gray w-full">
                아직 추가된 멤버가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-auto pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="submit"
            className={`w-full rounded-md text-sm h-[34px] ${
              members.length > 0 ? 'bg-primary text-white' : 'bg-lightgray'
            }`}
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
