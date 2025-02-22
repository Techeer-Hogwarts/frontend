'use client'

import TapBar from '../common/TapBar'
import BlogPost from '../blog/BlogPost'
import { useState } from 'react'

export default function Bookmark() {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const BookmarkProps = [
    {
      id: 1,
      title: '다람쥐가 도토리를 좋아하는 이유',
      name: '다람쥐',
      date: '2024년 9월',
    },
    {
      id: 2,
      title: '도토리가 다람쥐의 패이브릿 음식인 이우',
      name: '도토리',
      date: '2019년 11월',
    },
    {
      id: 3,
      title: '연어는 영어로 무엇인가 사르모느',
      name: '연어',
      date: '2032년 1월',
    },
    {
      id: 4,
      title: '김밥천국 vs 김밥천사',
      name: '김밥천국',
      date: '2019년 11월',
    },
  ]

  const handleCategoryChange = () => {}
  return (
    <div className="ml-10">
      <TapBar
        options={['이력서', '부트캠프', '파트너스']}
        // placeholder="세션 제목 혹은 이름을 검색해보세요"
        onSelect={handleCategoryChange}
      />
      <div className="mt-5 grid grid-cols-2 gap-8">
        {/* {BookmarkProps.map((Bookmark) => (
          <BlogPost
            key={Bookmark.id}
            title={Bookmark.title}
            date={Bookmark.date}
            name={Bookmark.name}
          />
        ))} */}
      </div>
    </div>
  )
}
