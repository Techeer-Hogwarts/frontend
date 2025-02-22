'use client'

import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { FaRegImage } from 'react-icons/fa6'

interface ResultImgBoxProps {
  previewUrl: string
  onFileSelect: (file: File) => void
  onDelete: () => void
}

export default function ResultImgBox({
  previewUrl,
  onFileSelect,
  onDelete,
}: ResultImgBoxProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className="relative flex flex-col gap-4 w-[409px]">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-gray text-white p-1 rounded-full z-10"
      >
        <IoClose size={16} />
      </button>

      <label className="relative w-full h-[223px] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Uploaded image"
            fill
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="flex flex-col w-[409px] h-[223px] rounded-md bg-lightgray text-[#A1A1A1] items-center justify-center gap-4">
            <FaRegImage size={30} />
            <span className="text-gray-500">
              눌러서 이미지를 업로드해주세요
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  )
}
