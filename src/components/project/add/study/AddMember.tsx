'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import MemberModal from '../../modal/study/StudyModal'
import { getStudyMember } from '@/api/project/study/study'

interface TagProps {
  position: string
}

interface Member {
  id: number
  name: string
  role?: string[]
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
  return (
    <div className="flex items-center justify-center text-pink w-[4.75rem] h-[1.125rem] bg-lightprimary">
      {position}
    </div>
  )
}

export default function AddMember({
  projectMember,
  onUpdateMember,
}: AddMemberProps) {
  const [projectType, setProjectType] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log('projectMember', projectMember)

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
        })),
    ]
    onUpdateMember(merged as Member[])

    // 모달 닫기
    setIsModalOpen(false)
  }

  // 멤버 삭제 함수
  const handleDelete = (id: number) => {
    const filtered = projectMember.filter((member) => member.userId !== id)

    onUpdateMember(filtered)
  }

  return (
    <div>
      <div className="flex items-center">
        {/* 모달 */}
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
      <div className="flex items-start pt-[1.5rem] pb-[1.5rem] gap-3 w-[52.5rem]  px-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {projectMember.map((member) => (
          <div
            key={member.name}
            className="relative w-[4.75rem]  flex flex-col items-center"
          >
            {/* X 버튼 */}
            <button
              onClick={() => handleDelete(member.userId)}
              className="w-[0.8rem] h-[0.8rem]  absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
            >
              <IoClose />
            </button>

            <Image
              src={member.profileImage}
              width={76}
              height={76}
              alt="Picture"
              className="w-[76px] h-[76px] object-cover border rounded-md bg-lightpink"
            />
            {/* 리더 표시 */}
            {member.isLeader && (
              <div className="absolute top-[3.2rem] left-0 w-full h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                <span className="text-white text-sm font-semibold">Leader</span>
              </div>
            )}

            <div>{member.name}</div>
            {projectType === 'project' && (
              <div className="flex flex-col gap-1">
                {member.role.map((position) => (
                  <Tag key={position} position={position} />
                ))}
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
