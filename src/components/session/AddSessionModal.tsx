/* eslint-disable @next/next/no-img-element */
'use client'

import CategoryBtn from './CategoryBtn'
import { useEffect, useState } from 'react'
import SessionDropdown from './SessionDropdown'
import ModalInputField from '../common/ModalInputField'

interface ModalProps {
  position: string
  modal: string
  onClose: () => void
}

export default function AddSessionModal({
  position,
  modal,
  onClose,
}: ModalProps) {
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '',
    presenter: '',
    date: '',
    position: '',
    category: position,
    videoUrl: '',
    fileUrl: '',
  })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [debouncedThumbnail, setDebouncedThumbnail] = useState(
    formData.thumbnail,
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedThumbnail(formData.thumbnail)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [formData.thumbnail])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handlePositionChange = (category: string) => {
    setSelectedCategory(category)
    setFormData({
      ...formData,
      position: category,
    })
  }
  const handleDropdownChange = (value: string) => {
    setFormData({
      ...formData,
      date: value,
    })
  }
  const postSession = async () => {
    try {
      const payload = {
        thumbnail: formData.thumbnail,
        title: formData.title,
        presenter: formData.presenter,
        date: formData.date,
        position: formData.position,
        category: formData.category,
        videoUrl: formData.videoUrl,
        fileUrl: formData.fileUrl,
      }

      const response = await fetch('/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
      }
      const result = await response.json()
      console.log('세션이 성공적으로 추가되었습니다:', result)
      window.location.href = '/session'
      onClose()
    } catch (err) {
      console.error('세션 데이터 업로드 중 오류 발생:', err)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50">
      <div className="w-[486px] min-h-[750px] h-auto flex flex-col items-center bg-white rounded-lg">
        <div>
          <p className="mt-6 mb-3 text-2xl font-semibold text-center">
            세션 영상 등록
          </p>
          <div className="relative mt-2 ">
            <img
              src={debouncedThumbnail}
              alt="PDF First Page Preview"
              className="object-cover w-[230px] h-[140px]"
              onError={(e: any) => {
                e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
              }}
            />
          </div>
        </div>
        <div className="relative flex flex-col mx-8 mt-4">
          <ModalInputField
            title="세션 제목을 입력해주세요"
            placeholder="세션 제목"
            name="title"
            essential="*"
            value={formData.title}
            handleInputChange={handleInputChange}
          />
          <ModalInputField
            title="발표자를 입력해주세요"
            placeholder="발표자"
            name="presenter"
            essential="*"
            value={formData.presenter}
            handleInputChange={handleInputChange}
          />
          <div className="relative">
            <ModalInputField
              title="썸네일을 입력해주세요"
              placeholder="썸네일"
              name="thumbnail"
              essential="*"
              value={formData.thumbnail}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="flex items-start justify-between mt-1 mb-2">
            <span>
              기간을 입력해주세요 <span className="text-primary">*</span>
            </span>
            {modal === '1' && (
              <SessionDropdown
                titles={[
                  '1기',
                  '2기',
                  '3기',
                  '4기',
                  '5기',
                  '6기',
                  '7기',
                  '8기',
                ]}
                options={[
                  'FIRST',
                  'SECOND',
                  'THIRD',
                  'FOURTH',
                  'FIFTH',
                  'SIXTH',
                  'SEVENTH',
                  'EIGHTH',
                ]}
                onSelect={handleDropdownChange}
              />
            )}
            {modal === '2' && (
              <SessionDropdown
                titles={[
                  '2022년 여름',
                  '2022년 겨울',
                  '2023년 여름',
                  '2023년 겨울',
                  '2024년 여름',
                  '2024년 겨울',
                ]}
                options={[
                  'SUMMER_2022',
                  'WINTER_2022',
                  'SUMMER_2023',
                  'WINTER_2023',
                  'SUMMER_2024',
                  'WINTER_2024',
                ]}
                onSelect={handleDropdownChange}
              />
            )}
          </div>
          <p>
            카테고리를 선택해주세요 <span className="text-primary">*</span>
          </p>
          <div className="flex gap-3 mt-1 mb-2">
            <CategoryBtn
              title="Frontend"
              isSelected={selectedCategory === 'FRONTEND'}
              onSelect={() => handlePositionChange('FRONTEND')}
            />
            <CategoryBtn
              title="Backend"
              isSelected={selectedCategory === 'BACKEND'}
              onSelect={() => handlePositionChange('BACKEND')}
            />
            <CategoryBtn
              title="DevOps"
              isSelected={selectedCategory === 'DEVOPS'}
              onSelect={() => handlePositionChange('DEVOPS')}
            />
            <CategoryBtn
              title="Others"
              isSelected={selectedCategory === 'OTHERS'}
              onSelect={() => handlePositionChange('OTHERS')}
            />
          </div>
          <ModalInputField
            title="영상 링크를 첨부해 주세요"
            placeholder="www.세션 제목.com"
            name="videoUrl"
            essential=""
            value={formData.videoUrl}
            handleInputChange={handleInputChange}
          />
          <ModalInputField
            title="발표 자료 링크를 첨부해주세요"
            placeholder="www.발표 자료 링크.com"
            name="fileUrl"
            essential=""
            value={formData.fileUrl}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-[202px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            onClick={postSession}
            className="w-[202px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
