'use client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { IoIosLink } from 'react-icons/io'
import CategoryBtn from './CategoryBtn'
import { useEffect, useState } from 'react'
import usePostEvent from '@/api/calendar/postEvent'
import usePatchEvent from '@/api/calendar/patchEvent'
import useGetEvent from '@/api/calendar/getEvent'
import { AddCalendarModalProps } from '@/types/calendar'

export default function AddCalenderModal({
  handleBack,
  mode,
  eventId,
}: AddCalendarModalProps) {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    url: '',
  })

  const { mutate: createEvent } = usePostEvent()
  const { mutate: editEvent } = usePatchEvent()
  const { data: eventData } = useGetEvent(eventId)

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    if (mode === 'edit' && eventData) {
      setFormData({
        category: eventData.category,
        title: eventData.title,
        startDate: eventData.startDate ? new Date(eventData.startDate) : null,
        endDate: eventData.endDate ? new Date(eventData.endDate) : null,
        url: eventData.url,
      })
      setSelectedCategory(eventData.category)
    }
  }, [eventData, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name) {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setFormData({ ...formData, category })
  }

  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.title ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.url
    ) {
      return
    }

    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    }

    if (mode === 'create') {
      createEvent(formattedData, {
        onSuccess: () => {
          handleBack()
        },
        onError: (error) => {},
      })
    } else if (mode === 'edit' && eventId) {
      editEvent(
        { eventId, eventData: formattedData },
        {
          onSuccess: () => {
            handleBack()
          },
          onError: (error) => {},
        },
      )
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] h-[576px] flex flex-col items-center items-cente bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-7 mb-1 font-semibold">
            {mode === 'create' ? '일정 추가' : '일정 수정'}
          </p>
          <Image
            src="/images/calendericon.png"
            alt="calender"
            width={100}
            height={100}
          />
        </div>
        <div className="relative mx-9 mt-5">
          <p>
            카테고리를 선택해주세요.<span className="text-primary">*</span>
          </p>
          <div className="flex mt-1 gap-[3px]">
            {['행사', '컨퍼런스', '지원 공고'].map((category) => {
              const mappedCategory =
                category === '행사'
                  ? 'TECHEER'
                  : category === '컨퍼런스'
                    ? 'CONFERENCE'
                    : 'JOBINFO'

              return (
                <CategoryBtn
                  key={category}
                  title={category}
                  isSelected={selectedCategory === mappedCategory}
                  onClick={() => handleCategorySelect(mappedCategory)}
                />
              )
            })}
          </div>
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            제목을 입력해주세요.<span className="text-primary">*</span>
          </p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-[416px] rounded-sm pl-2 text-sm mt-1 outline-none h-[34px] border border-lightgray"
          />
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            날짜를 입력해주세요.<span className="text-primary">*</span>
          </p>
          <div className="flex relative gap-[2px]">
            <div className="relative mt-1">
              <button
                type="button"
                className="w-[207px] rounded-sm pl-2 text-sm outline-none h-[34px] border border-lightgray text-[#757575] flex items-center cursor-pointer"
                onClick={() => {
                  setStartDateOpen(!startDateOpen)
                  setEndDateOpen(false)
                }}
              >
                {formData.startDate
                  ? formData.startDate.toLocaleDateString()
                  : '시작 날짜 선택'}
                <MdOutlineCalendarMonth className="ml-auto mr-1 w-6 h-6 text-lightgray" />
              </button>
              {startDateOpen && (
                <div className="absolute z-10 mt-1">
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date: any) => {
                      setFormData({ ...formData, startDate: date })
                      setStartDateOpen(false)
                    }}
                    inline
                  />
                </div>
              )}
            </div>
            <div className="relative mt-1">
              <button
                type="button"
                className="w-[207px] rounded-sm pl-2 text-sm outline-none h-[34px] text-[#757575] border border-lightgray flex items-center cursor-pointer"
                onClick={() => {
                  setEndDateOpen(!endDateOpen)
                  setStartDateOpen(false)
                }}
              >
                {formData.endDate
                  ? formData.endDate.toLocaleDateString()
                  : '종료 날짜 선택'}
                <MdOutlineCalendarMonth className="ml-auto mr-1 w-6 h-6 text-lightgray" />
              </button>
              {endDateOpen && (
                <div className="absolute z-10 mt-1">
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date: any) => {
                      setFormData({ ...formData, endDate: date })
                      setEndDateOpen(false)
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            링크를 입력해주세요.<span className="text-primary">*</span>
          </p>
          <div className="relative">
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-[416px] pl-2 rounded-sm text-sm mt-1 mb-6 outline-none h-[34px] border border-lightgray"
            />
            <IoIosLink className="absolute top-2 right-[5px] w-6 h-6 text-lightgray" />
          </div>
        </div>

        <div className="flex gap-4 mt-1">
          <button
            type="submit"
            onClick={handleBack}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray "
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            {mode === 'create' ? '등록' : '수정'}
          </button>
        </div>
      </div>
    </div>
  )
}
