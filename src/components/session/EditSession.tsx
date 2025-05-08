/* eslint-disable @next/next/no-img-element */
'use client'

import CategoryBtn from '@/components/session/CategoryBtn'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { fetchUserProfile } from '@/api/mypage/myprofile'
import { SessionFormData } from '@/types/\bsession/session'
import { getSingleSession, updateSession } from '@/api/session/session'
import SessionDropdown from './SessionDropdown'
import ModalInputField from '../common/ModalInputField'

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

export default function EditSession() {
  const params = useParams()
  const sessionId = params.id as string
  const [thumbnailError, setThumbnailError] = useState(false)
  const [debouncedThumbnail, setDebouncedThumbnail] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { register, handleSubmit, setValue, control, watch } =
    useForm<SessionFormData>({
      defaultValues: {
        thumbnail: '',
        title: '',
        presenter: '',
        date: '',
        position: '',
        category: '',
        videoUrl: '',
        fileUrl: '',
      },
    })
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
  const fetchSingleSession = async (name: string) => {
    const singleVideo = await getSingleSession(sessionId)
    if (singleVideo.user.name !== name) {
      alert('본인이 작성한 게시물만 수정할 수 있습니다.')
      window.location.href = '/session'
      return
    }
    Object.keys(singleVideo).forEach((key) => {
      if (key in singleVideo)
        setValue(key as keyof SessionFormData, singleVideo[key])
    })
    setSelectedCategory(singleVideo.category)
  }

  const getUser = async () => {
    const response = await fetchUserProfile()
    fetchSingleSession(response.name)
  }

  useEffect(() => {
    getUser()
  }, [sessionId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedThumbnail(watch('thumbnail'))
    }, DEBOUNCE_DELAY)
    return () => clearTimeout(timer)
  }, [watch('thumbnail')])

  const onSubmit = (data: SessionFormData) => {
    mutate({ id: sessionId, payload: data })
  }

  const renderDateDropdown = () => {
    if (watch('category') === 'PARTNERS') {
      return (
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <SessionDropdown
              titles={PARTNERS_OPTIONS.titles}
              options={PARTNERS_OPTIONS.values}
              selectedOption={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      )
    }
    if (watch('category') === 'BOOTCAMP') {
      return (
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <SessionDropdown
              titles={BOOTCAMP_OPTIONS.titles}
              options={BOOTCAMP_OPTIONS.values}
              selectedOption={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      )
    }
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[486px] min-h-[750px] h-auto flex flex-col items-center bg-white rounded-lg"
      >
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

        <div className="relative flex flex-col mx-8 mt-4">
          <ModalInputField
            title="세션 제목을 입력해주세요"
            placeholder="세션 제목"
            essential="*"
            registerProps={register('title', { required: true })}
          />
          <ModalInputField
            title="발표자를 입력해주세요"
            placeholder="발표자"
            essential="*"
            registerProps={register('presenter', { required: true })}
          />
          <ModalInputField
            title="썸네일을 입력해주세요"
            placeholder="썸네일"
            essential="*"
            registerProps={register('thumbnail', { required: true })}
          />

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
                onSelect={(cat) => {
                  setSelectedCategory(cat)
                  setValue('position', cat)
                }}
              />
            ))}
          </div>

          <ModalInputField
            title="영상 링크를 첨부해 주세요"
            placeholder="www.세션 제목.com"
            essential="*"
            registerProps={register('videoUrl', { required: true })}
          />
          <ModalInputField
            title="발표 자료 링크를 첨부해주세요"
            placeholder="www.발표 자료 링크.com"
            essential=""
            registerProps={register('fileUrl', { required: true })}
          />
        </div>

        <div className="flex gap-4 mt-1">
          <button
            type="button"
            onClick={() => (window.location.href = '/session')}
            className="flex items-center justify-center w-[202px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
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
  )
}
