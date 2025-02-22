'use client'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogPost from '@/components/blog/BlogPost'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'

interface User {
  name: string
}

interface Author {
  authorName: string
  authorImage: string
}

interface BlogProps {
  title: string
  id: string
  date: string
  url: string
  likeCount: number
  user: User
  author: Author
}

export default function Page() {
  const [blog, setBlog] = useState<BlogProps[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { activeOption } = useTapBarStore()
  const [inputValue, setInputValue] = useState('')
  const [limit, setLimit] = useState(3)
  const [ref, inView] = useInView()

  const category = ['금주의 블로그', 'TECHEER', 'SHARED']

  // 카테고리 변경 처리 함수
  const handleCategoryChange = (selectedCategory: string) => {
    // 카테고리가 변경되면 해당 카테고리에 맞는 블로그 데이터를 가져옵니다.
    setLimit(3) // 페이지네이션 초기화
    if (selectedCategory === '금주의 블로그') {
      getBestBlog(3)
    } else {
      getBlog(3, inputValue, selectedCategory)
    }
  }

  // const handleSearch = (query: string) => {
  //   sessionStorage.setItem('searchQuery', query)
  //   setInputValue(query)
  // }
  const handleDeleteSession = (id: string) => {
    setBlog((prevblogs) => prevblogs.filter((blog) => blog.id !== id))
    setMessage('블로그 글이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }
  const getBestBlog = useCallback(async (newLimit: number) => {
    try {
      const response = await fetch(
        `https://api.techeerzip.cloud/api/v1/blogs/best?offset=0&limit=${newLimit}`,
        {
          method: 'GET',
        },
      )

      if (!response.ok) {
        throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
      }

      const result = await response.json()
      setBlog(result) // 상태 업데이트
      setLimit(newLimit)
      console.log('블로그api가 성공적으로 통신되었습니다:', result.data)
    } catch (err) {
      console.error('블로그 데이터 업로드 중 오류 발생:', err)
    }
  }, [])
  const getBlog = useCallback(
    async (newLimit: number, query: string, category: string) => {
      const baseUrl = 'https://api.techeerzip.cloud/api/v1/blogs'
      const params = {
        keyword: query,
        category: category,
        offset: '0',
        limit: String(newLimit),
      }

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== null && value !== '',
        ),
      )
      const queryString = new URLSearchParams(filteredParams).toString()
      const url = `${baseUrl}?${queryString}`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setBlog(data || [])
      } catch (err) {
        console.error('블로그 데이터 로딩 중 오류 발생:', err)
      }
    },
    [],
  )

  useEffect(() => {
    if (activeOption == '금주의 블로그') {
      getBestBlog(3)
    } else if (activeOption == 'TECHEER' || activeOption == 'SHARED') {
      getBlog(3, inputValue, activeOption)
    }
  }, [activeOption, inputValue])

  useEffect(() => {
    if (!inView) return // inView가 false면 실행 x
    if (activeOption === '금주의 블로그') {
      getBestBlog(limit + 3)
      return
    } else if (activeOption == 'Techeer' || activeOption == 'Shared') {
      getBlog(limit + 3, inputValue, activeOption)
    }
  }, [inView, activeOption])

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        {message && (
          <div className="bg-red-500/80 z-50 rounded-md fixed text-white text-center bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2">
            {message}
          </div>
        )}
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2.5rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
        </div>
        {/* <TapBar
          options={['금주의 블로그', 'TECHEER', 'SHARED']}
          placeholder="블로그 제목을 검색해보세요"
          onSearch={handleSearch}
        /> */}
        <TapBar options={category} onSelect={handleCategoryChange} />
        <div className="flex w-full h-[1px] mt-5 bg-gray"></div>
        <div className="flex-col grid grid-cols-3 gap-8 mt-8">
          {blog.map((blog, index) => (
            <BlogPost
              key={index}
              title={blog.title}
              id={blog.id}
              date={blog.date}
              url={blog.url}
              likeCount={blog.likeCount}
              name={blog.author.authorName}
              image={blog.author.authorImage}
              onDelete={handleDeleteSession}
            />
          ))}
          <div ref={ref} />
        </div>
      </div>
      <AddBtn />
    </div>
  )
}
