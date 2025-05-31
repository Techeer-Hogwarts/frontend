import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import SearchBar from '@/components/common/SearchBar'
import SessionList from '@/components/session/SessionList'
import ModalManager from '@/components/session/ModalManager'

const tapBarOptions = ['전체보기', '부트캠프', '파트너스', '금주의 세션']

export default function Page() {
  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">세션영상</p>
          <p className="text-[1.25rem]">테커인들의 세션영상을 확인해보세요.</p>
        </div>
        <div className="flex justify-between">
          <TapBar options={tapBarOptions} />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="session"
            onSearchResult={null}
          />
        </div>

        <div className="flex w-full h-[1px] my-5 bg-gray" />
        <ModalManager>
          <SessionList />
        </ModalManager>
        <AddBtn />
      </div>
    </div>
  )
}
