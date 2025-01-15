'use client'

import { useState } from 'react'
import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'

export default function Likes() {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const Session = [
    {
      id: 1,
      title: '가나다라마바사',
      name: '김박사',
      date: '2022년 2월',
    },
    {
      id: 2,
      title: '네이버 개발자가 될 사람',
      name: '카카오맨',
      date: '2020년 1월',
    },
    {
      id: 3,
      title: 'git발git발',
      name: '김사무라이',
      date: '2012년 1월',
    },
  ]
  return (
    <div className="ml-10">
      <TapBar
        options={['이력서', '부트캠프', '파트너스']}
        placeholder="세션 제목 혹은 이름을 검색해보세요"
        onSearch={handleSearch}
      />
      <div className="mt-5 grid grid-cols-2 gap-8">
        {/* {Session.map((session) => (
          <SessionPost
            key={session.id}
            title={session.title}
            date={session.date}
            name={session.name}
          />
        ))} */}
      </div>
    </div>
  )
}
