'use client'

import { useState, useEffect } from 'react'
import { CalendarClientProps } from '@/types/calendar'
import AddCalendarBtn from '@/components/calender/AddCalendarBtn'
import AddCalenderModal from '@/components/calender/AddCalendarModal'
import Calendar from '@/components/calender/Calendar'
import FilterBtn from '@/components/calender/FilterBtn'
import AuthModal from '@/components/common/AuthModal'
import BookmarkModal from '@/components/common/BookmarkModal'
import getCurrentUser from '@/api/calendar/getCurrentUser'

export default function CalendarClient({
  CATEGORIES,
  defaultSelectCategories,
}: CalendarClientProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(['ALL'])
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUserId(user.id)
      } catch {}
    }
    fetchUser()
  }, [])

  const handleOpenModal = async () => {
    if (!currentUserId) {
      try {
        const user = await getCurrentUser()
        setCurrentUserId(user.id)
      } catch {
        setAuthModalOpen(true)
        return
      }
    }
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  const handleFilter = (category: string) => {
    if (category === 'ALL') {
      setSelectedCategories(['ALL'])
      return
    }

    setSelectedCategories((prev) => {
      let newSelected

      if (prev.includes('ALL')) {
        newSelected = [category]
      } else {
        if (prev.includes(category)) {
          newSelected = prev.filter((cat) => cat !== category)
        } else {
          newSelected = [...prev, category]
        }
      }

      if (newSelected.length === 3) return ['ALL']
      return newSelected.length === 0 ? ['ALL'] : newSelected
    })
  }

  const allCategoryValues = CATEGORIES.filter((c) => c.value !== 'ALL').map(
    (c) => c.value,
  )
  const displayCategories = selectedCategories.includes('ALL')
    ? allCategoryValues
    : selectedCategories

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
        selectedCategories={displayCategories}
        setAuthModalOpen={() => setAuthModalOpen(true)}
        currentUserId={currentUserId}
      />
      {showModal && (
        <AddCalenderModal handleBack={handleCloseModal} mode="create" />
      )}
    </div>
  )
}
