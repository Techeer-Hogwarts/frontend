'use client'
import AddCalendarBtn from '@/components/calender/AddCalendarBtn'
import AddCalenderModal from '@/components/calender/AddCalendarModal'
import Calendar from '@/components/calender/Calendar'
import FilterBtn from '@/components/calender/FilterBtn'
import { CATEGORIES } from '@/constants/category'
import { useState } from 'react'

export default function Page() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    CATEGORIES.map((category) => category.value)
  )
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleFilter = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const newCategories = prev.filter((cat) => cat !== category)
        return newCategories.length === 0 ? CATEGORIES.map((cat) => cat.value) : newCategories
      } else {
        return [...prev, category]
      }
    })
  }

  return (
    <div className="flex flex-col items-center">
      <AddCalendarBtn onClick={handleOpenModal} />
      <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
        <p className="text-[2.5rem] font-bold">정보 공유</p>
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
      <Calendar selectedCategories={selectedCategories} />
      {showModal && <AddCalenderModal handleBack={handleCloseModal} mode='create' />}
    </div>
  )
}
