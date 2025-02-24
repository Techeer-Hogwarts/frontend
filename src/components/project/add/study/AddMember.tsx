'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import MemberModal from '../../modal/study/StudyModal'

interface TagProps {
  position: string
}

interface Member {
  id: number
  name: string
  role?: string[]
  isLeader?: boolean
  profileImage?: string | null
  userId?: number
}

interface AddMemberProps {
  projectMember: Member[]
  onUpdateMember?: (newMembers: Member[]) => void
  onDeleteMember?: (memberId: number, userId: number) => void
  onRestoreMember?: (memberId: number, userId: number) => void
}

function Tag({ position }: TagProps) {
  return (
    <div className="flex items-center justify-center text-pink w-[4.75rem] h-[1.125rem] bg-lightprimary">
      {position}
    </div>
  )
}

export default function AddMember({
  projectMember,
  onUpdateMember,
  onDeleteMember,
  onRestoreMember,
}: AddMemberProps) {
  const [projectType, setProjectType] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  // 모달 열기
  const handleAddMember = () => {
    setIsModalOpen(true)
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // 모달에서 "저장하기" 눌렀을 때: 선택된 멤버들을 병합하여 상위 컴포넌트에 전달
  const handleSaveMembers = (selectedMembers: Member[]) => {
    const merged = [...projectMember]

    selectedMembers.forEach((newMember) => {
      // 기존에 같은 id가 있는지 확인
      const exist = merged.find((m) => m.id === newMember.id)
      if (!exist) {
        merged.push({
          userId: newMember.id,
          name: newMember.name,
          isLeader: newMember.isLeader,
          profileImage: newMember.profileImage,
          id: newMember.id,
        })
      }
    })

    // 상위 컴포넌트의 상태 업데이트 후 모달 닫기
    onUpdateMember?.(merged)
    setIsModalOpen(false)
  }

  // 멤버 삭제 함수 (컴포넌트 최상단에 선언)
  const handleDelete = (member: any) => {
    const filtered = projectMember.filter((m) => m.id !== member.id)
    onUpdateMember?.(filtered)
    onDeleteMember?.(member.id, member.userId || 0)
  }

  return (
    <div>
      <div className="flex items-center">
        {/* 모달 컴포넌트 렌더링 */}
        {isModalOpen && (
          <MemberModal
            existingMembers={projectMember}
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
          />
        )}
        <div className="font-medium text-gray mb-3">
          팀원을 입력해주세요<span className="text-primary">*</span>
        </div>
      </div>
      <div className="flex items-start pt-[1.5rem] pb-[1.5rem] gap-3 w-[52.5rem] px-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버 카드 렌더링 */}
        {projectMember.map((member) => (
          <div
            key={member.id}
            className="relative w-[4.75rem] flex flex-col items-center"
          >
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDelete(member)}
              className="w-[0.8rem] h-[0.8rem] absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
            >
              <IoClose />
            </button>
            <Image
              src={member.profileImage || '/default-profile.png'}
              width={76}
              height={76}
              alt="Profile Image"
              className="w-[76px] h-[76px] object-cover border rounded-md bg-lightpink"
            />
            {/* 리더 표시 */}
            {member.isLeader && (
              <div className="absolute top-[3.2rem] left-0 w-full h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                <span className="text-white text-sm font-semibold">Leader</span>
              </div>
            )}
            <div>{member.name}</div>
            {projectType === 'project' && member.role && (
              <div className="flex flex-col gap-1">
                {member.role.map((position) => (
                  <Tag key={position} position={position} />
                ))}
              </div>
            )}
          </div>
        ))}
        {/* 멤버 추가 버튼 */}
        <button
          onClick={handleAddMember}
          className="w-[4.75rem] h-[4.75rem] flex flex-col items-center justify-center border border-gray rounded-md text-2xl shadow-sm hover:shadow-[0px_0px_4px_1px_rgba(138,138,138,0.73)]"
        >
          +
        </button>
      </div>
    </div>
  )
}
