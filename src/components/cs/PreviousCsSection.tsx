'use client'

import { useState } from 'react'
import SearchBar from '@/components/common/SearchBar'
import ProblemFilterTabs from './Filter'
import ProblemList from './ProblemList'

const problems = [
  {
    id: 1,
    title:
      'tanstack-query에서 stale time과 gc time의 차이점에 대해서 설명해주세요.',
    date: '2025년 03월 28일',
    solved: true,
  },
  {
    id: 2,
    title: '엔티티 매니저에 대해 설명해주세요.',
    date: '2025년 03월 26일',
    solved: false,
  },
  {
    id: 3,
    title: '리액트의 render phase와 commit phase에 대해서 설명해주세요.',
    date: '2025년 03월 25일',
    solved: false,
  },
  {
    id: 4,
    title: 'OSIV(Open Session In View) 옵션에 대해서 설명해주세요.',
    date: '2025년 03월 24일',
    solved: false,
  },
]

export default function PreviousCSSection() {
  const [solvedFilter, setSolvedFilter] = useState<'solved' | 'unsolved'>(
    'solved',
  )
  const [searchResults, setSearchResults] = useState<any>(null)

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-[2rem] font-bold">이전 CS</h2>
        <SearchBar
          placeholder="이름 또는 키워드로 검색"
          index=""
          onSearchResult={setSearchResults}
        />
      </div>
      <div className="border-t my-5" />
      <ProblemFilterTabs
        solvedFilter={solvedFilter}
        setSolvedFilter={setSolvedFilter}
      />
      <ProblemList problems={problems} solvedFilter={solvedFilter} />
    </section>
  )
}
