'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { RxQuestionMarkCircled } from 'react-icons/rx'

import MemberModal from '../modal/StudyModal'
import ProjectMemberModal from '../modal/ProjectModal'

interface TagProps {
  position: string
}

interface Member {
  id: number
  name: string
  teamRole?: string
  leader?: string
  profileImage?: string | null
  isLeader?: boolean
  userId?: number
}

interface AddMemberProps {
  projectMember: Member[]
  onUpdateMember?: (newMembers: Member[]) => void
}

function Tag({ position }: TagProps) {
  // 화면에 표시할 문자열
  const displayPosition = position === 'DataEngineer' ? 'Data' : position

  return (
    <div className="flex items-center justify-center text-pink w-[4.5rem] bg-lightprimary rounded-md">
      {displayPosition}
    </div>
  )
}

export default function AddMember({
  projectMember,
  onUpdateMember,
}: AddMemberProps) {
  const [projectType, setProjectType] = useState<null | string>(null)
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

  // 모달에서 "저장하기" 눌렀을 때 → 부모로 members 전달
  const handleSaveMembers = (selectedMembers: Member[]) => {
    // 중복 제거 로직
    const merged = [
      ...projectMember,
      ...selectedMembers
        .filter(
          (newMember) =>
            !projectMember.some((member) => member.userId === newMember.id),
        )
        .map((member) => ({
          userId: member.id,
          isLeader: member.isLeader,
          profileImage: member.profileImage,
          teamRole: member.teamRole,
          name: member.name,
        })),
    ]

    onUpdateMember && onUpdateMember(merged as Member[])
    setIsModalOpen(false)
  }

  // 멤버 삭제 함수
  const handleDelete = (id: number) => {
    const filtered = projectMember.filter((member) => member.id !== id)
    onUpdateMember && onUpdateMember(filtered)
  }

  return (
    <div>
      {isModalOpen &&
        (projectType === 'project' ? (
          <ProjectMemberModal
            onClose={handleCloseModal}
            onSave={handleSaveMembers}
          />
        ) : (
          <MemberModal onClose={handleCloseModal} onSave={handleSaveMembers} />
        ))}

      <div className="font-medium text-gray mb-2">
        팀원을 입력해주세요<span className="text-primary">*</span>
      </div>
      <div className="flex justify-start gap-1 text-xs items-center text-gray mb-1">
        <RxQuestionMarkCircled /> Data: DataEngineer
      </div>

      {/* (A) Grid로 9개 컬럼 지정 → 9명 초과 시 자동으로 2행, 3행... */}
      <div className="grid grid-cols-9 items-start gap-3 w-[52.5rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray">
        {projectMember.map((member) => (
          <div
            key={member.userId}
            className="relative flex flex-col items-center"
          >
            {/* X 버튼 */}
            <button
              onClick={() => handleDelete(member.id!)}
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
