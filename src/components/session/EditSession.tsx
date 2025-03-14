/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import CategoryBtn from '@/components/session/CategoryBtn'
import ModalInputField from '@/components/common/ModalInputField'
import SessionDropdown from '@/components/session/SessionDropdown'
import { getSingleSession } from '@/app/session/_lib/getSingleSession'

interface SessionFormData {
  thumbnail: string
  title: string
  presenter: string
  date: string
  position: string
  category: string
  videoUrl: string
  fileUrl: string
}

const updateSession = async (data: {
  id: string
  payload: SessionFormData
}) => {
  const response = await fetch(`/api/v1/sessions/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data.payload),
  })

  if (response.status === 403) {
    throw new Error('본인이 작성한 게시물만 수정할 수 있습니다.')
  }
  if (!response.ok) {
    throw new Error('세션 데이터를 수정하는 데 실패했습니다.')
  }

  return response.json()
}

const DEBOUNCE_DELAY = 1000
const BOOTCAMP_OPTIONS = {
  titles: [
    '2022년 여름',
    '2022년 겨울',
    '2023년 여름',
    '2023년 겨울',
    '2024년 여름',
    '2024년 겨울',
  ],
  values: [
    'SUMMER_2022',
    'WINTER_2022',
    'SUMMER_2023',
    'WINTER_2023',
    'SUMMER_2024',
    'WINTER_2024',
  ],
}
const PARTNERS_OPTIONS = {
  titles: ['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기'],
  values: [
    'FIRST',
    'SECOND',
    'THIRD',
    'FOURTH',
    'FIFTH',
    'SIXTH',
    'SEVENTH',
    'EIGHTH',
  ],
}
const CATEGORIES = ['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']

const initialFormData: SessionFormData = {
  thumbnail: '',
  title: '',
  presenter: '',
  date: '',
  position: '',
  category: '',
  videoUrl: '',
  fileUrl: '',
}

export default function EditSession() {
  const params = useParams()
  const sessionId = params.id as string
  const [debouncedThumbnail, setDebouncedThumbnail] = useState('')
  const [thumbnailError, setThumbnailError] = useState(false)
  const [formData, setFormData] = useState<SessionFormData>(initialFormData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { mutate } = useMutation({
    mutationFn: updateSession,
    onSuccess: () => {
      window.location.href = '/session'
    },
    onError: (error: Error) => {
      if (error.message.includes('본인이 작성한 게시물')) {
        alert('본인이 작성한 게시물만 수정할 수 있습니다.')
      }
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePositionChange = (category: string) => {
    setSelectedCategory(category)
    setFormData((prev) => ({ ...prev, position: category }))
  }

  const handleDropdownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, date: value }))
  }

  const fetchSignleSession = async (name: string) => {
    try {
      const singleVideo = await getSingleSession(sessionId)
      setFormData(singleVideo)
      // console.log('a', singleVideo.user.name)
      // console.log('b', name)
      if (singleVideo.user.name !== name) {
        window.location.href = '/session'
        alert('본인이 작성한 게시물만 수정할 수 있습니다.')
        return
      }
      setSelectedCategory(singleVideo.category)
    } catch (err) {}
  }
  const getUser = async () => {
    try {
      const response = await fetch('/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json()
      fetchSignleSession(data.name)
    } catch (err) {}
  }

  useEffect(() => {
    getUser()
  }, [sessionId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedThumbnail(formData.thumbnail)
    }, DEBOUNCE_DELAY)
    return () => clearTimeout(timer)
  }, [formData.thumbnail])

  const renderDateDropdown = () => {
    if (formData.category === 'PARTNERS') {
      return (
        <SessionDropdown
          titles={PARTNERS_OPTIONS.titles}
          options={PARTNERS_OPTIONS.values}
          selectedOption={formData.date}
          onSelect={handleDropdownChange}
        />
      )
    }
    if (formData.category === 'BOOTCAMP') {
      return (
        <SessionDropdown
          titles={BOOTCAMP_OPTIONS.titles}
          options={BOOTCAMP_OPTIONS.values}
          selectedOption={formData.date}
          onSelect={handleDropdownChange}
        />
      )
    }
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50">
      <div className="w-[486px] min-h-[750px] h-auto flex flex-col items-center bg-white rounded-lg">
        <div>
          <p className="mt-6 mb-3 text-2xl font-semibold text-center">
            세션 영상 수정
          </p>
          <div className="relative mt-2">
            <img
              src={
                thumbnailError
                  ? '/images/session/thumbnail.png'
                  : debouncedThumbnail
              }
              alt="PDF First Page Preview"
              className="object-cover w-[230px] h-[140px]"
              onError={() => setThumbnailError(true)}
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
            {renderDateDropdown()}
          </div>

          <p>
            카테고리를 선택해주세요 <span className="text-primary">*</span>
          </p>
          <div className="flex gap-3 mt-1 mb-2">
            {CATEGORIES.map((category) => (
              <CategoryBtn
                key={category}
                title={category}
                isSelected={selectedCategory === category}
                onSelect={() => handlePositionChange(category)}
              />
            ))}
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
            onClick={() => (window.location.href = '/session')}
            className="flex items-center justify-center w-[202px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => mutate({ id: sessionId, payload: formData })}
            className="w-[202px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
