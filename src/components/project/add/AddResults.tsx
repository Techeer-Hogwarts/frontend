'use client'

import React, { useState, useEffect } from 'react'
import ExistingResultImgBox from './ExistingResultImgBox'
import ResultImgBox from './ResultImgBox'
import { IoAddCircleOutline } from 'react-icons/io5'

interface ExistingImage {
  id: number
  imageUrl: string
}
type ImageItem =
  | { type: 'existing'; id: number; url: string }
  | { type: 'new'; file: File; previewUrl: string }

interface AddResultsProps {
  existingResultImages?: ExistingImage[] // 기존 이미지 목록
  newResultImages: File[] // 새로 업로드할 이미지 목록
  onUpdateResultImages: (files: File[]) => void
  onDeleteOldResultImage?: (id: number) => void
}

export default function AddResults({
  existingResultImages = [],
  newResultImages,
  onUpdateResultImages,
  onDeleteOldResultImage,
}: AddResultsProps) {
  const [imageItems, setImageItems] = useState<ImageItem[]>([])
  const [didInit, setDidInit] = useState(false)

  // (A) 처음 마운트 시점에만 existing + new 합쳐서 imageItems 초기화
  useEffect(() => {
    if (didInit) return
    setDidInit(true)

    const oldItems: ImageItem[] = existingResultImages.map((img) => ({
      type: 'existing',
      id: img.id,
      url: img.imageUrl,
    }))

    const newItems: ImageItem[] = newResultImages.map((file) => ({
      type: 'new',
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    const combined = [...oldItems, ...newItems]

    // 혹시 하나도 없으면 초기 박스 2개
    if (combined.length === 0) {
      combined.push(
        { type: 'new', file: null as any, previewUrl: '' },
        { type: 'new', file: null as any, previewUrl: '' },
      )
    }
    setImageItems(combined)
  }, [didInit, existingResultImages, newResultImages])

  // (C) 이미지 추가 버튼
  const handleAddBox = () => {
    setImageItems((prev) => [
      ...prev,
      { type: 'new', file: null as any, previewUrl: '' },
    ])
  }

  // (D) 파일 업로드
  const handleFileSelect = (index: number, file: File) => {
    setImageItems((prev) => {
      const copy = [...prev]
      copy[index] = {
        type: 'new',
        file,
        previewUrl: URL.createObjectURL(file),
      }
      return copy
    })
    // 새 File[]로 재구성
    const newFiles = rebuildNewFiles(index, file)
    onUpdateResultImages(newFiles)
  }

  function rebuildNewFiles(changedIndex: number, changedFile: File) {
    // imageItems의 복사본을 만들어서 new 타입만 추출
    const copy = imageItems.map((item, idx) => {
      if (idx === changedIndex) {
        return {
          type: 'new',
          file: changedFile,
          previewUrl: URL.createObjectURL(changedFile),
        }
      }
      return item
    })

    return copy
      .filter((item) => item.type === 'new' && item.file)
      .map((item) => (item as { file: File }).file)
  }

  // (E) 삭제
  const handleDelete = (index: number) => {
    const item = imageItems[index]
    if (item.type === 'existing') {
      // 기존 이미지 → 상위 콜백 (deleteResultImages에 id 추가)
      onDeleteOldResultImage(item.id)
    } else {
      // 새 이미지 → newResultImages에서 제거
      const newFiles = newResultImages.filter((_, i) => i !== index)
      onUpdateResultImages(newFiles)
    }
    // 로컬 state에서도 제거
    setImageItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mt-[3.19rem]">
        <div className="font-medium text-gray">결과물/디자인을 올려주세요</div>
        <button
          onClick={handleAddBox}
          className="flex items-center gap-2 text-primary font-medium"
        >
          <IoAddCircleOutline size={24} />
          이미지 추가
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {imageItems.map((item, idx) => {
          if (item.type === 'existing') {
            return (
              <ExistingResultImgBox
                key={`old-${idx}`}
                imageUrl={item.url}
                onDelete={() => handleDelete(idx)}
              />
            )
          } else {
            return (
              <ResultImgBox
                key={`new-${idx}`}
                previewUrl={item.previewUrl}
                onFileSelect={(file) => handleFileSelect(idx, file)}
                onDelete={() => handleDelete(idx)}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
