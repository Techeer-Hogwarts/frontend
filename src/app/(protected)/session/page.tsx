'use client'

import { useState } from 'react'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import SearchBar from '@/components/common/SearchBar'
import SessionList from '@/components/session/SessionList'
import ModalManager from '@/components/session/ModalManager'
import { useTapBarStore } from '@/store/tapBarStore'
import { useUrlQueryFilters } from '@/hooks/useUrlQueryFilters'

const tapBarOptions = ['전체보기', '부트캠프', '파트너스', '금주의 세션']

export default function Page() {
  const [searchResults, setSearchResults] = useState<any>(null)
  const { activeOption } = useTapBarStore()
  const { filters, set } = useUrlQueryFilters()
  
  // URL 쿼리와 동기화된 탭 옵션
  const currentTabOption = filters.selectedCategory || activeOption || '전체보기'

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">세션영상</p>
          <p className="text-[1.25rem]">테커인들의 세션영상을 확인해보세요.</p>
        </div>
        <div className="flex justify-between">
          <TapBar 
            options={tapBarOptions}
            onOptionChange={(option) => set('selectedCategory', option)}
            initialOption={currentTabOption}
          />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="session"
            onSearchResult={setSearchResults}
          />
        </div>

        <div className="flex w-full h-[1px] my-5 bg-gray" />
        <ModalManager>
          <SessionList searchResults={searchResults} />
        </ModalManager>
        <AddBtn />
      </div>
    </div>
  )
}
