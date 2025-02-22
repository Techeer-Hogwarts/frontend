'use client'

import Btn from '../Btn'

import { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

interface BoxProps {
  name: string
  generation: string
  imageSrc: string
  onClose: () => void
  isLeader: boolean
  onUpdate: (isLeader: boolean) => void
}

const SmallMemberBox = ({
  name,
  generation,
  imageSrc,
  onClose,
  isLeader,
  onUpdate,
}: any) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const handleToggleLeader = () => {
    const updatedLeaderState = !isLeader
    onUpdate(updatedLeaderState)
  }

  const handleRoleClick = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else if (selectedRoles.length < 2) {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <div className="relative flex border border-gray max-h-[3.75rem] w-[12.625rem] rounded-md p-1 gap-2">
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
        width={48}
        height={48}
        className="w-[48px] h-[48px] bg-lightpink rounded-md"
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
      </div>
    </div>
  )
}

export default SmallMemberBox
