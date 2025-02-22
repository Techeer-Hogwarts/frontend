'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { getPositionStyle } from '@/styles/positionStyles'
import MemberModal from '../modal/StudyModal'
import ProjectMemberModal from '../modal/ProjectModal'
import { getStudyMember } from '@/api/project/study/study'

interface TagProps {
  position: string
}

interface Member {
  id?: number // 프로젝트-멤버 테이블 PK
  userId?: number // 사용자 PK
  name: string
  teamRole?: string
  isLeader?: boolean
  profileImage?: string
  email?: string
}

interface AddMemberProps {
  projectMember: Member[]
  onUpdateMember?: (newMembers: Member[]) => void
  /** 삭제 시: (memberId, userId) → 상위 tempDeleted 배열에 추가 */
  onDeleteMember?: (memberId: number, userId: number) => void

  /** 다시 추가 시: (memberId, userId) → 상위 tempDeleted 배열에서 제거 */
  onRestoreMember?: (memberId: number, userId: number) => void
}

function Tag({ position }: TagProps) {
  const { bg, textColor } = getPositionStyle(position)
  const displayPosition = position === 'DataEngineer' ? 'Data' : position
  return (
    <div
      className={`flex items-center justify-center ${textColor} w-[4.5rem] bg-${bg} rounded-md`}
    >
      {displayPosition}
    </div>
  )
}

export default function AddMember({
  projectMember,
  onUpdateMember,
  onDeleteMember,
  onRestoreMember,
}: AddMemberProps) {
  const [projectType, setProjectType] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log('projectMember', projectMember)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProjectType(localStorage.getItem('projectType'))
    }
  }, [])

  /** (A) 모달 열기 */
  const handleAddMember = () => {
    setIsModalOpen(true)
  }
  /** (B) 모달 닫기 */
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  /**
   * (C) 모달에서 새 멤버 선택 후 "저장"
   *     - 만약 deleteMembers에 들어있는 멤버가 다시 추가된다면,
   *       onRestoreMember(그 멤버 PK)로 복원
   */
  const handleSaveMembers = (selectedMembers: Member[]) => {
    const merged = [...projectMember]

    selectedMembers.forEach((newMember) => {
      // 이미 있는지 확인 (id 기준)
      const exist = merged.find((m) => m.id === newMember.id)
      if (!exist) {
        // 새로 추가
        merged.push({
          userId: newMember.id,
          name: newMember.name,
          teamRole: newMember.teamRole,
          isLeader: newMember.isLeader,
          profileImage: newMember.profileImage,
          email: newMember.email,
          id: newMember.id, // 백엔드가 멤버 PK로 사용하는 경우
        })

        // (A-1) tempDeleted에서 제거
        onRestoreMember?.(newMember.id!, newMember.id!)
      }
    })

    onUpdateMember?.(merged)
    setIsModalOpen(false)
  }

  /**
   * (D) 멤버 삭제
   *     - state에서 제거 + onDeleteMember(멤버 PK)
   */
  const handleDelete = (member: Member) => {
    if (!member.id) return
    // state에서 제거
    const filtered = projectMember.filter((m) => m.id !== member.id)
    onUpdateMember?.(filtered)
    // tempDeleted에 추가
    onDeleteMember?.(member.id, member.userId || 0)
  }

  return (
    <div>
      {/* (E) 모달 */}
      {isModalOpen &&
        (projectType === 'project' ? (
          <ProjectMemberModal
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
            existingMembers={projectMember}
          />
        ) : (
          <MemberModal
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
            existingMembers={undefined}
          />
        ))}

      <div className="font-medium text-gray mb-2">
        팀원을 입력해주세요<span className="text-primary">*</span>
      </div>
      <div className="flex justify-start gap-1 text-xs items-center text-gray mb-1">
        <RxQuestionMarkCircled /> Data: DataEngineer
      </div>

      <div className="grid grid-cols-9 items-start gap-3 w-[52.5rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray">
        {projectMember.map((member) => (
          <div key={member.id} className="relative flex flex-col items-center">
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
              alt="Picture"
              className="border rounded-md bg-lightpink w-[76px] h-[76px] object-cover"
            />

            {member.isLeader && (
              <div className="absolute top-[3.2rem] left-0 w-full h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                <span className="text-white text-sm font-semibold">Leader</span>
              </div>
            )}

            <div>{member.name}</div>
            {projectType === 'project' && member.teamRole && (
              <div className="flex flex-col gap-1">
                <Tag position={member.teamRole} />
              </div>
            )}
          </div>
        ))}

        {/* + 버튼 */}
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
