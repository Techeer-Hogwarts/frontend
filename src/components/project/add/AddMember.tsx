'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

interface TagProps {
  position: string
}

function Tag({ position }: TagProps) {
  return (
    <div className="flex items-center justify-center text-pink w-[4.75rem] h-[1.125rem] bg-lightprimary">
      {position}
    </div>
  )
}

export default function AddMember() {
  const [members, setMembers] = useState([
    { id: 1, name: '홍길동', role: ['Backend', 'DevOps'], leader: 'yes' },
    { id: 2, name: '홍길동', role: ['Backend'], leader: 'no' },
    { id: 3, name: '홍길동', role: ['Backend'], leader: 'no' },
    { id: 4, name: '홍길동', role: ['Frontend'], leader: 'no' },
    { id: 5, name: '홍길동', role: ['Frontend'], leader: 'no' },
  ])
  const [projectType, setProjectType] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  // 멤버 삭제 함수
  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }
  const router = useRouter()

  // 모달 창 열기
  const handleAddMember = () => {
    if (projectType === 'project') {
      router.push('/project/add/project/addMember')
    } else {
      router.push('/project/add/study/addMember')
    }
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="font-medium text-gray mb-3">
          팀원을 입력해주세요<span className="text-primary">*</span>
        </div>
      </div>
      <div className="flex items-start pt-[1.5rem] pb-[1.5rem] gap-3 w-[52.5rem]  px-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {members.map((member, index) => (
          <div
            key={index}
            className="relative w-[4.75rem]  flex flex-col items-center"
          >
            {/* X 버튼 */}
            <button
              onClick={() => handleDelete(member.id)}
              className="w-[0.8rem] h-[0.8rem]  absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
            >
              <IoClose />
            </button>

            <Image
              src="/profile.png"
              width={76}
              height={76}
              alt="Picture"
              className="border rounded-md bg-lightpink"
            />
            {/* 리더 표시 */}
            {member.leader === 'yes' && (
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
