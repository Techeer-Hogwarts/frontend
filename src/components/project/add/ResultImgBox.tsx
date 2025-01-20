'use client'

import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { FaRegImage } from 'react-icons/fa6'

interface BoxProps {
  id: number
  onDelete: () => void
}

const ResultImgBox = ({ id, image, onImageChange, onDelete }: BoxProps) => {
  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageChange(e.target.result.toString())
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative flex flex-col gap-4 w-[409px]">
      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-gray text-white p-1 rounded-full z-10"
      >
        <IoClose size={16} />
      </button>

      {/* 이미지 업로드 및 미리보기 */}
      <label className="relative w-full h-[223px] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        {image ? (
          <Image
            src={image}
            alt="Uploaded image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
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
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  )
}

export default ResultImgBox
