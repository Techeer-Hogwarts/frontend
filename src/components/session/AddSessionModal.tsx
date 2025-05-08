/* eslint-disable @next/next/no-img-element */
'use client'

import CategoryBtn from './CategoryBtn'
import SessionDropdown from './SessionDropdown'
import ModalInputField from '../common/ModalInputField'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { postSession } from '@/api/session/session'
import { SessionFormData } from '@/types/\bsession/session'

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
  const { register, handleSubmit, watch, setValue } = useForm<SessionFormData>({
    defaultValues: {
      thumbnail: '',
      title: '',
      presenter: '',
      date: '',
      position: '',
      category: position,
      videoUrl: '',
      fileUrl: '',
    },
  })

  const thumbnail = watch('thumbnail')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [debouncedThumbnail, setDebouncedThumbnail] = useState(thumbnail)

  const onSubmit = async (data: SessionFormData) => {
    try {
      await postSession(data)
      window.location.href = '/session'
      onClose()
    } catch (error) {
      console.error('세션 등록 실패:', error)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setValue('position', category)
  }

  const handleDropdownChange = (value: string) => {
    setValue('date', value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedThumbnail(thumbnail)
    }, 1000)
    return () => clearTimeout(timer)
  }, [thumbnail])

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50">
      <div className="w-[486px] min-h-[750px] h-auto flex flex-col items-center bg-white rounded-lg">
        <p className="mt-6 mb-3 text-2xl font-semibold text-center">
          세션 영상 등록
        </p>
        <div className="relative mt-2">
          <img
            src={debouncedThumbnail}
            alt="PDF First Page Preview"
            className="object-cover w-[230px] h-[140px]"
            onError={(e: any) => {
              e.target.src = '/images/session/thumbnail.png'
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col mx-8 mt-4"
        >
          <ModalInputField
            name="title"
            title="세션 제목을 입력해주세요"
            placeholder="세션 제목"
            essential="*"
            registerProps={register('title', { required: true })}
          />
          <ModalInputField
            name="presenter"
            title="발표자를 입력해주세요"
            placeholder="발표자"
            essential="*"
            registerProps={register('presenter', { required: true })}
          />
          <ModalInputField
            name="thumbnail"
            title="썸네일을 입력해주세요"
            placeholder="썸네일"
            essential="*"
            registerProps={register('thumbnail', { required: true })}
          />
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
            {['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS'].map((position) => (
              <CategoryBtn
                key={position}
                title={position.charAt(0) + position.slice(1).toLowerCase()}
                isSelected={selectedCategory === position}
                onSelect={() => handleCategoryChange(position)}
              />
            ))}
          </div>
          <ModalInputField
            name="videoUrl"
            title="영상 링크를 첨부해 주세요"
            placeholder="www.세션 제목.com"
            essential="*"
            registerProps={register('videoUrl', { required: true })}
          />
          <ModalInputField
            name="fileUrl"
            title="발표 자료 링크를 첨부해주세요"
            placeholder="www.발표 자료 링크.com"
            essential=""
            registerProps={register('fileUrl', { required: true })}
          />
          <div className="flex gap-4 mt-4 mb-6">
            <button
              type="button"
              onClick={onClose}
              className="w-[202px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-[202px] rounded-md text-sm h-[34px] bg-primary text-white"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
