'use client'

import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { FaRegImage } from 'react-icons/fa6'

interface BoxProps {
  previewUrl: string
  onFileSelect: (file: File) => void
  onDelete: () => void
}

const ResultImgBox = ({ previewUrl, onFileSelect, onDelete }: BoxProps) => {
  console.log(previewUrl);
  
  // 파일 선택 시 파일 객체를 받아 상위 컴포넌트에 전달하는 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
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

      {/* 이미지 업로드 및 미리보기 영역 */}
      <label className="relative w-full h-[223px] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Uploaded image"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        ) : (
          <div className="flex flex-col w-full h-full rounded-md bg-lightgray text-[#A1A1A1] items-center justify-center gap-4">
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

export default ResultImgBox
