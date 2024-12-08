'use client'

import React, { useState, useEffect } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import ResultImgBox from '../ResultImgBox'

export default function AddResults() {
  const [boxes, setBoxes] = useState<number[]>([0, 1]) // 박스 개수 관리
  const [title, setTitle] = useState<string>('') // 상단 설명 문구 상태

  const [projectType, setProjectType] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])
  
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
          {projectType === 'project'
            ? '결과물(혹은 피그마 디자인)을 올려주세요'
            : '활동 사진을 올려주세요(줌 화면, 책 사진, 인강 사진 등 스터디에 대한 증거 사진)'}
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
          <ResultImgBox
            key={index}
            id={boxId}
            onDelete={() => handleDeleteBox(index)}
          />
        ))}
      </div>
    </div>
  )
}
