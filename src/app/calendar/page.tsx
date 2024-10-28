import AddCalenderModal from '@/components/calender/AddCalenderModal'
import Calendar from '@/components/calender/Calendar'
import FilterBtn from '@/components/calender/FilterBtn'
import SearchBar from '@/components/common/SearchBar'

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px] text-left mt-14 mb-7">
        <p className="text-4xl mb-5 font-bold">정보 공유</p>
        <p className="text-xl">행사, 컨퍼런스 및 취업 정보 모아보기</p>
      </div>
      <div className="flex w-[1200px] justify-between items-center">
        <div className="flex gap-2">
          <FilterBtn title="행사" />
          <FilterBtn title="컨퍼런스" />
          <FilterBtn title="지원 공고" />
        </div>
        <SearchBar placeholder="일정을 검색해보세요." />
      </div>
      <Calendar />
      <AddCalenderModal />
    </div>
  )
}
