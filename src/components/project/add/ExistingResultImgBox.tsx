'use client'

import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

interface ExistingBoxProps {
  imageUrl: string
  onDelete: () => void
}

export default function ExistingResultImgBox({
  imageUrl,
  onDelete,
}: ExistingBoxProps) {
  return (
    <div className="relative flex flex-col gap-4 w-[409px]">
      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-gray text-white p-1 rounded-full z-10"
      >
        <IoClose size={16} />
      </button>

      {/* 기존 이미지 미리보기 (URL) */}
      <div className="relative w-full h-[223px] bg-gray-200 rounded-lg flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="기존 이미지"
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
