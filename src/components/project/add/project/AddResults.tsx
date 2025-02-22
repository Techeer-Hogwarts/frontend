import React, { useState, useEffect, useRef } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import ExistingResultImgBox from './ResultImgBox'
import ResultImgBox from '../ResultImgBox'

type ImageItem =
  | { type: 'existing'; url: string }
  | { type: 'new'; file: File | null; previewUrl: string }

interface AddResultsProps {
  existingUrls?: string[] // 서버에 있는 이미지 URL들
  resultImages: File[] | any // 새로 업로드할 이미지 파일들
  onUpdate: (key: string, value: any) => void
}

export default function AddResults({
  existingUrls = [],
  resultImages,
  onUpdate,
}: any) {
  const [projectType, setProjectType] = useState<string | null>(null)

  // (A) 파일 → 미리보기 URL 매핑을 위한 ref
  const filePreviewMap = useRef<Map<File, string>>(new Map())

  // (B) 최종 표시할 이미지 아이템 배열
  const [imageItems, setImageItems] = useState<ImageItem[]>([])

  useEffect(() => {
    // 1) projectType 로컬스토리지에서 읽어오기
    const storedProjectType = localStorage.getItem('projectType')
    setProjectType(storedProjectType)

    // 2) 기존 이미지 아이템 생성
    const oldItems = existingUrls.map((url) => ({
      type: 'existing' as const,
      url,
    }))

    // 3) 새 파일 아이템 생성 (타입 체크 포함)
    const newItems = resultImages.map((file) => {
      if (file instanceof File) {
        let preview = filePreviewMap.current.get(file)
        if (!preview) {
          preview = URL.createObjectURL(file)
          filePreviewMap.current.set(file, preview)
        }
        return {
          type: 'new' as const,
          file,
          previewUrl: preview,
        }
      } else {
        // File이 아닌 경우 빈 값 반환
        return {
          type: 'new' as const,
          file: null,
          previewUrl: '',
        }
      }
    })

    // 4) 기존 이미지와 새 파일을 합쳐서 초기 이미지 아이템 배열 생성
    const combined = [...oldItems, ...newItems]

    // 5) 기존 이미지와 새 이미지가 모두 없을 경우, 기본 박스 2개 생성
    if (combined.length === 0) {
      combined.push(
        { type: 'new', file: null, previewUrl: '' },
        { type: 'new', file: null, previewUrl: '' },
      )
    }

    setImageItems(combined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 초기 1회 실행

  // (C) 새로운 이미지 박스 추가
  const handleAddBox = () => {
    setImageItems((prev) => [
      ...prev,
      { type: 'new', file: null, previewUrl: '' },
    ])
  }

  // (D) 파일 선택 시 해당 박스 업데이트 및 미리보기 URL 생성 (타입 체크 포함)
  const handleFileSelect = (index: number, file: File) => {
    if (!(file instanceof File)) {
      console.error('유효하지 않은 파일입니다.')
      return
    }

    let preview = filePreviewMap.current.get(file)
    if (!preview) {
      preview = URL.createObjectURL(file)
      filePreviewMap.current.set(file, preview)
    }

    const updated = [...imageItems]
    updated[index] = {
      type: 'new',
      file,
      previewUrl: preview,
    }
    setImageItems(updated)

    // 새로 업로드할 파일만 상위 컴포넌트에 전달
    const newFiles = updated
      .filter((item) => item.type === 'new' && item.file)
      .map((item) => (item as { file: File }).file)
    onUpdate('resultImages', newFiles)
  }

  // (E) 이미지 삭제
  const handleDelete = (index: number) => {
    const updated = [...imageItems]
    const removed = updated.splice(index, 1)[0]
    setImageItems(updated)

    // 삭제된 항목이 새 파일일 경우, resultImages 업데이트
    if (removed.type === 'new' && removed.file) {
      const newFiles = updated
        .filter((item) => item.type === 'new' && item.file)
        .map((item) => (item as { file: File }).file)
      onUpdate('resultImages', newFiles)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mt-[3.19rem]">
        <div className="font-medium text-gray">
          {projectType === 'project'
            ? '결과물(혹은 피그마 디자인)을 올려주세요'
            : '활동 사진을 올려주세요'}
        </div>
        <button
          onClick={handleAddBox}
          className="flex items-center gap-2 text-primary font-medium"
        >
          <IoAddCircleOutline size={24} />
          이미지 추가
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {imageItems.map((item, idx) =>
          item.type === 'existing' ? (
            <ExistingResultImgBox
              key={`old-${idx}`}
              imageUrl={item.url}
              onDelete={() => handleDelete(idx)}
            />
          ) : (
            <ResultImgBox
              key={`new-${idx}`}
              previewUrl={item.previewUrl}
              onFileSelect={(file) => handleFileSelect(idx, file)}
              onDelete={() => handleDelete(idx)}
            />
          ),
        )}
      </div>
    </div>
  )
}
