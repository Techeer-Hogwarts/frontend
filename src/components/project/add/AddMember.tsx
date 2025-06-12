'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import ProjectMemberModal from '../modal/ProjectModal'
import StudyMemberModal from '../modal/study/StudyModal'
import { getPositionStyle } from '@/styles/positionStyles'

interface TagProps {
  position: string
}

interface Member {
  id?: number
  userId?: number
  name: string
  teamRole?: string
  isLeader?: boolean
  profileImage?: string | null
}

interface AddMemberProps {
  members: Member[]
  type: 'project' | 'study'
  onUpdateMember?: (newMembers: Member[]) => void
  onDeleteMember?: (memberId: number, userId: number) => void
  onRestoreMember?: (memberId: number, userId: number) => void
}

function Tag({ position }: TagProps) {
  const { bg, textColor } = getPositionStyle(position)
  return (
    <div
      className={`flex items-center justify-center ${textColor} w-[4.5rem] bg-${bg} rounded-md text-center text-xs py-[0.1rem]`}
    >
      {position === 'DATA_ENGINEER' ? 'DATA' : position}
    </div>
  )
}

export default function AddMember({
  members,
  type,
  onUpdateMember,
  onDeleteMember,
  onRestoreMember,
}: AddMemberProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddMember = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSaveMembers = (selectedMembers: Member[]) => {
    const merged = [...members]

    selectedMembers.forEach((newMember) => {
      if (!merged.some((m) => m.id === newMember.id)) {
        merged.push({
          userId: newMember.id,
          name: newMember.name,
          teamRole: newMember.teamRole,
          isLeader: newMember.isLeader,
          profileImage: newMember.profileImage,
          id: newMember.id,
        })
        onRestoreMember?.(newMember.id!, newMember.id!)
      }
    })

    onUpdateMember?.(merged)
    setIsModalOpen(false)
  }

  const handleDelete = (member: Member) => {
    if (!member.id) return
    const filtered = members.filter((m) => m.id !== member.id)
    onUpdateMember?.(filtered)
    onDeleteMember?.(member.id, member.userId || 0)
  }

  return (
    <div>
      {isModalOpen &&
        (type === 'project' ? (
          <ProjectMemberModal
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
            existingMembers={members}
          />
        ) : (
          <StudyMemberModal
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
            existingMembers={members}
          />
        ))}

      <div className="font-medium text-gray mb-3">
        팀원을 입력해주세요<span className="text-primary">*</span>
      </div>
      <div className="grid grid-cols-9 items-start gap-3 w-[52.5rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray">
        {members.map((member) => (
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
              alt="Profile Image"
              className="w-[76px] h-[76px] object-cover border rounded-md"
            />
            {member.isLeader && (
              <div className="absolute top-[3.2rem] left-0 w-full h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                <span className="text-white text-sm font-semibold">Leader</span>
              </div>
            )}
            <div>{member.name}</div>
            {member.teamRole && <Tag position={member.teamRole} />}
          </div>
        ))}

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
