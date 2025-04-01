'use client'
import AddCalendarBtn from '@/components/calender/AddCalendarBtn'
import AddCalenderModal from '@/components/calender/AddCalendarModal'
import Calendar from '@/components/calender/Calendar'
import FilterBtn from '@/components/calender/FilterBtn'
import AuthModal from '@/components/common/AuthModal'
import BookmarkModal from '@/components/common/BookmarkModal'
import { CATEGORIES } from '@/constants/category'
import { useCalendar } from '@/hooks/calendar/useCalendar'

export default function Page() {
  const {
    showModal,
    authModalOpen,
    modalOpen,
    selectedCategories,
    handleOpenModal,
    handleCloseModal,
    handleFilter,
    setAuthModalOpen,
    setModalOpen,
  } = useCalendar()

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
