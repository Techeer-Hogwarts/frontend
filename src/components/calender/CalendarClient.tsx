'use client'

import { useState } from 'react'
import { CalendarClientProps } from '@/types/calendar'
import AddCalendarBtn from '@/components/calender/AddCalendarBtn'
import AddCalenderModal from '@/components/calender/AddCalendarModal'
import Calendar from '@/components/calender/Calendar'
import FilterBtn from '@/components/calender/FilterBtn'
import AuthModal from '@/components/common/AuthModal'
import BookmarkModal from '@/components/common/BookmarkModal'

export default function CalendarClient({
  CATEGORIES,
  defaultSelectCategories,
}: CalendarClientProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(
    defaultSelectCategories,
  )
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    fetchUserProfile()
  }

  const handleCloseModal = () => setShowModal(false)

  const handleFilter = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const newCategories = prev.filter((cat) => cat !== category)
        return newCategories.length === 0
          ? CATEGORIES.map((cat) => cat.value)
          : newCategories
      } else {
        return [...prev, category]
      }
    })
  }

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/v1/users', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.status === 401) {
        setAuthModalOpen(true)
        return
      }
      setShowModal(true)
      if (!response.ok) {
        throw new Error('유저조회 실패')
      }
    } catch (err: any) {
      setAuthModalOpen(true)
      throw new Error(err)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      <BookmarkModal
        isOpen={modalOpen}
        message="내가 만든 일정만 삭제할 수 있습니다."
        onClose={() => setModalOpen(false)}
      />
      <AddCalendarBtn onClick={handleOpenModal} />
      <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
        <p className="text-[2rem] font-bold">정보 공유</p>
        <p className="text-[1.25rem]">행사, 컨퍼런스 및 취업 정보 모아보기</p>
      </div>
      <div className="flex w-[1200px] justify-between items-center">
        <div className="flex gap-2">
          {CATEGORIES.map(({ title, value }) => (
            <FilterBtn
              key={value}
              title={title}
              isClicked={selectedCategories.includes(value)}
              onClick={() => handleFilter(value)}
            />
          ))}
        </div>
        {/* <SearchBar placeholder="일정을 검색해보세요." /> */}
      </div>
      <Calendar
        selectedCategories={selectedCategories}
        setAuthModalOpen={() => setAuthModalOpen(true)}
      />
      {showModal && (
        <AddCalenderModal handleBack={handleCloseModal} mode="create" />
      )}
    </div>
  )
}
