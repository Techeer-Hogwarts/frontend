'use client'

import React, { useState, useEffect } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import ResultImgBox from '../ResultImgBox'

interface AddResultsProps {
  // 부모(상위)에서 넘어오는 상태
  // 예: projectData.resultImages를 "File[]" 형태로 관리한다고 가정
  resultImages: File[]
  onUpdate: (key: string, value: any) => void
}

export default function AddResults({
  resultImages,
  onUpdate,
}: AddResultsProps) {
  // (1) 박스 식별자 관리
  const [boxes, setBoxes] = useState<number[]>([0, 1]) // 초기 2개 박스
  // (2) 각 박스별 이미지 미리보기 URL
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [projectType, setProjectType] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  /**
   * (3) 박스에서 파일이 선택되면,
   *     - 상위로 File 객체를 전달하여 resultImages[index]에 저장
   *     - 미리보기용 URL을 생성해 imagePreviews[index]에 저장
   */
  const handleFileSelect = (index: number, file: File) => {
    // 3-1) 상위 상태에 File 객체 저장
    const updatedFiles = [...resultImages]
    updatedFiles[index] = file
    onUpdate('resultImages', updatedFiles)

    // 3-2) 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file)
    const updatedPreviews = [...imagePreviews]
    updatedPreviews[index] = previewUrl
    setImagePreviews(updatedPreviews)
  }

  // (4) 박스 추가 함수
  const handleAddBox = () => {
    setBoxes((prev) => [...prev, prev.length])
  }

  // (5) 박스 삭제 함수 (1개 이하로는 삭제 불가)
  const handleDeleteBox = (index: number) => {
    if (boxes.length > 1) {
      // 박스 식별자 제거
      setBoxes((prev) => prev.filter((_, i) => i !== index))

      // resultImages에서도 해당 index의 File 제거
      const updatedFiles = [...resultImages]
      updatedFiles.splice(index, 1)
      onUpdate('resultImages', updatedFiles)

      // 미리보기 배열에서도 제거
      const updatedPreviews = [...imagePreviews]
      updatedPreviews.splice(index, 1)
      setImagePreviews(updatedPreviews)
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

      {/* (6) 박스 영역 */}
      <div className="grid grid-cols-2 gap-6">
        {boxes.map((boxId, index) => (
          <ResultImgBox
            key={boxId}
            id={boxId}
            // 현재 미리보기 URL
            previewUrl={imagePreviews[index] || ''}
            // 파일이 선택되면 handleFileSelect로 전달
            onFileSelect={(file) => handleFileSelect(index, file)}
            onDelete={() => handleDeleteBox(index)}
          />
        ))}
      </div>
    </div>
  )
}
