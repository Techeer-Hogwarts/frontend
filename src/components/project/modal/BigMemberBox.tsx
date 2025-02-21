'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import Btn from './Btn'

interface BoxProps {
  name: string
  year: number
  imageSrc: string
  onClose: () => void
  isLeader: boolean
  teamRole?: string
  onUpdate: (isLeader: boolean, role: string) => void
}

const BigMemberBox = ({
  name,
  year,
  imageSrc,
  onClose,
  isLeader,
  teamRole = '',
  onUpdate,
}: BoxProps) => {
  // 단일 문자열로 역할 관리 (초기값: teamRole)
  const [selectedRole, setSelectedRole] = useState<string>(teamRole)

  // 리더 토글
  const handleToggleLeader = () => {
    const newIsLeader = !isLeader
    // (A) onUpdate에 role도 함께 전달
    onUpdate(newIsLeader, selectedRole)
  }

  // 역할 클릭: 이미 선택된 역할을 누르면 해제, 아니면 교체
  const handleRoleClick = (role: string) => {
    let newRole = ''
    if (selectedRole === role) {
      // 이미 같은 역할이면 해제
      newRole = ''
      setSelectedRole('')
    } else {
      // 새 역할로 교체
      newRole = role
      setSelectedRole(role)
    }
    // (B) onUpdate에 isLeader + newRole 전달
    onUpdate(isLeader, newRole)
  }

  return (
    <div className="relative flex border border-gray h-[6.1875rem] rounded-md p-3 gap-2">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray hover:text-darkgray"
      >
        <IoClose size={12} />
      </button>

      <Image
        src={imageSrc || '/default-profile.png'}
        alt="Profile Image"
        width={76}
        height={76}
        className="w-[76px] h-[76px] bg-lightpink rounded-md object-cover"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p>{name}</p>
          <p className="text-gray text-xs">{year}기</p>
        </div>

        {/* 리더 역할 토글 버튼 */}
        <div className="w-[56px] mt-2">
          <Btn text="Leader" onClick={handleToggleLeader} isSelected={isLeader} />
        </div>

        {/* 스택 역할 선택 (최대 1개) */}
        <div className="flex gap-1 mt-1">
          {['Frontend', 'Backend', 'DevOps', 'Full Stack', 'Data Engineer'].map(
            (role, index) => (
              <Btn
                key={index}
                text={role}
                onClick={() => handleRoleClick(role)}
                isSelected={selectedRole === role}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default BigMemberBox
