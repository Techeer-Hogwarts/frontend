'use client'

import Btn from './Btn'

import { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

interface BoxProps {
  name: string
  generation: string
  imageSrc: string
  onClose: () => void
}

const BigMemberBox = ({ name, generation, imageSrc, onClose }: BoxProps) => {
  const [isLeader, setIsLeader] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const handleToggleLeader = () => {
    setIsLeader((prev) => !prev)
  }

  const handleRoleClick = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else if (selectedRoles.length < 2) {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <div className="relative flex border border-gray h-[6.1875rem] rounded-md p-3 gap-2">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <IoClose size={12} />
      </button>

      <Image
        src={imageSrc || '/default-profile.png'}
        alt="Profile Image"
        width={76}
        height={76}
        className="w-[76px] h-[76px] bg-lightpink rounded-md"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p>{name}</p>
          <p className="text-gray text-xs">{generation}</p>
        </div>

        {/* 리더 역할 토글 버튼 */}
        <div className="mt-2">
          <Btn
            text="Leader"
            onClick={handleToggleLeader}
            isSelected={isLeader}
          />
        </div>

        {/* 스택 역할 선택 (최대 2개) */}
        <div className="flex gap-1 mt-2">
          {['Frontend', 'Backend', 'DevOps', 'Full-Stack'].map(
            (role, index) => (
              <Btn
                key={index}
                text={role}
                onClick={() => handleRoleClick(role)}
                isSelected={selectedRoles.includes(role)}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default BigMemberBox
