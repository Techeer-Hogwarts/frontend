'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SmallMemberBox from './SmallMemberBox'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/api/project/common'
import { useAuthStore } from '@/store/authStore'

interface Member {
  id: number
  name: string
  year: string
  profileImage?: string | null
  isLeader: boolean
}

interface MemberModalProps {
  existingMembers: any
  onClose: () => void
  onSave: (selectedMembers: Member[]) => void
}

const MemberModal = ({
  existingMembers,
  onClose,
  onSave,
}: MemberModalProps) => {
  const dropDownRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [name, setName] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const userId = localStorage.getItem('userId')

  //모든 사용자 목록
  const { data: allUsers } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: getAllUsers,
  })

  // 현재 사용자
  const { user } = useAuthStore()

  // 사람 선택
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setIsDropdownOpen(true)
  }

  //컴포넌트에 입력자 자동 추가
  useEffect(() => {
    if (user) {
      const alreadyExists = existingMembers.some(
        (m) => m.userId === user.id || m.id === user.id,
      )
      if (!alreadyExists) {
        // 모달 내부 members에도 없으면 추가
        setMembers((prev: any) => {
          const inModal = prev.some((mm) => mm.id === user.id)
          if (!inModal) {
            return [
              ...prev,
              {
                id: user.id,
                name: user.name,
                year: user.year,
                profileImage: user.profileImage,
                isLeader: true, // 원하는 초기값
                teamRole: '',
              },
            ]
          }
          return prev
        })
      }
    }
  }, [user, existingMembers])

  // 드롭다운 필터
  const filteredUsers = allUsers?.filter((u) => {
    // 1) 이미 모달 내부(members)에 추가된 유저는 제외
    const inModal = members.some((m) => m.id === u.id)
    if (inModal) return false

    // 2) 이미 상위에 존재(existingMembers)하면 제외
    const inExisting = existingMembers.some(
      (em) => em.userId === u.id || em.id === u.id,
    )
    if (inExisting) return false

    // 3) 이름 검색
    return u.name.toLowerCase().includes(name.toLowerCase())
  })

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

  // 멤버 추가
  const handleAddMember = (member: Member) => {
    if (!members.some((m) => m.id === member.id)) {
      setMembers((prevMembers) => [
        ...prevMembers,
        { ...member, isLeader: false },
      ])
    }
    setIsDropdownOpen(false)
  }

  // 멤버 삭제
  const handleRemoveMember = (name: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.name !== name),
    )
  }

  // 리더 업데이트 함수
  const handleUpdateLeader = (id: number, isLeader: boolean) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, isLeader } : member,
      ),
    )
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-7 w-[30.375rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          스터디 팀원 추가
        </p>
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
              className="absolute w-[26.25rem] bg-white border border-gray mt-1 max-h-48 overflow-y-auto z-10"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
              }}
            >
              {filteredUsers?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-lightprimary"
                  onClick={() => handleAddMember(member)}
                >
                  <Image
                    src={member.profileImage || '/'}
                    alt="ProfileInfo"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-md "
                  />
                  <div className="flex gap-3 items-center">
                    <p>{member.name}</p>
                    <p className="text-gray text-xs">{member.year}기</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`flex flex-wrap justify-between w-full h-[25m] overflow-y-auto gap-2 ${members.length > 10 ? '' : 'px-1'}`}
        >
          {members.length > 0 ? (
            members.map((member) => (
              <SmallMemberBox
                key={member.id}
                name={member.name}
                generation={member.year}
                imageSrc={member.profileImage || '/default-profile.png'}
                isLeader={member.isLeader}
                onClose={() => handleRemoveMember(member.name)}
                onUpdate={(isLeader) => handleUpdateLeader(member.id, isLeader)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              아직 추가된 멤버가 없습니다.
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-auto pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="submit"
            className={`w-[200px] rounded-md text-sm h-[34px] text-white ${members.length > 0 ? 'bg-primary text-white' : 'bg-lightgray'}`}
            onClick={() => onSave(members)}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberModal
