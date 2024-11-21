'use client'

import { useState } from 'react'
import TapBar from '@/components/common/TapBar'
import SessionPost from '@/components/session/SessionPost'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import AddBtn from '@/components/common/AddBtn'

export default function Page() {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-7">
          <p className="text-4xl mb-5 font-bold">세션영상</p>
          <p className="text-xl">테커인들의 세션영상을 확인해보세요.</p>
        </div>
        <TapBar
          options={['전체보기', '부트캠프', '파트너스']}
          placeholder="세션 제목 혹은 이름을 검색해보세요"
        />
        <div className="flex justify-start mt-5 gap-3">
          <Dropdown
            title="기간"
            options={['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
          <Dropdown
            title="포지션"
            options={['Frontend', 'Backend', 'DevOps', 'Others']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
        </div>

        <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 my-6">
          <FilterBtn title="Frontend" />
          <FilterBtn title="1기" />
        </div>
        <div className="grid grid-cols-3 gap-8">
          <SessionPost />
          <SessionPost />
          <SessionPost />
        </div>
        <AddBtn />
      </div>
    </div>
  )
}
