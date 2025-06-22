'use client'

import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogList from '@/components/blog/BlogList'
import SearchBar from '@/components/common/SearchBar'
import { useTapBarStore } from '@/store/tapBarStore'
import { BlogChallenge } from '@/components/blog/BlogChallenge'

const category = [
  '전체보기',
  'TECHEER',
  'SHARED',
  '금주의 블로그',
  '블로깅 챌린지',
]
export default function Page() {
  const { activeOption } = useTapBarStore()
  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
        </div>
        <div className="flex justify-between">
          <TapBar options={category} />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="blog"
            onSearchResult={null}
          />
        </div>
        <div className="flex w-full h-[1px] mt-5 bg-gray mb-[1rem]" />
        {activeOption === '블로깅 챌린지' ? <BlogChallenge /> : <BlogList />}
      </div>
      <AddBtn />
    </div>
  )
}
