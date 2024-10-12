'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { IoAddCircleOutline, IoClose } from 'react-icons/io5'
import { FaRegImage } from 'react-icons/fa6'

interface BoxProps {
  id: number
  onDelete: () => void
}

const Box = ({ id, onDelete }: BoxProps) => {
  const [image, setImage] = useState<string | null>(null)
  const [text, setText] = useState('')

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string) // 이미지 URL 설정
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative flex flex-col gap-4 w-[409px]">
      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full z-10"
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

      {/* 이미지 설명 입력 */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="이미지에 대한 간단한 설명을 써주세요."
        className="w-full p-2 border border-lightgray rounded-md"
      />
    </div>
  )
}

export default function AddResults() {
  const [boxes, setBoxes] = useState<number[]>([0, 1]) // 박스 개수 관리

  // 박스 추가 함수
  const handleAddBox = () => {
    setBoxes([...boxes, boxes.length]) // 박스 개수를 증가시킴
  }

  // 박스 삭제 함수 (1개 이하로는 삭제 불가)
  const handleDeleteBox = (index: number) => {
    if (boxes.length > 1) {
      setBoxes(boxes.filter((_, i) => i !== index)) // 해당 박스 삭제
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mt-[3.19rem]">
        <div className="flex items-center justify-center text-center font-medium text-gray">
          결과물(혹은 피그마 디자인)을 올려주세요
        </div>
        <button
          onClick={handleAddBox}
          className="flex items-center gap-2 text-primary font-medium"
        >
          <IoAddCircleOutline size={24} />
          이미지 추가
        </button>
      </div>

      {/* 박스 부분 */}
      <div className="grid grid-cols-2 gap-6">
        {boxes.map((boxId, index) => (
          <Box key={index} id={boxId} onDelete={() => handleDeleteBox(index)} />
        ))}
      </div>
    </div>
  )
}
