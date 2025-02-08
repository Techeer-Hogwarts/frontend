'use client'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogPost from '@/components/blog/BlogPost'
import { useTapBarStore } from '@/store/tapBarStore'
import { useCallback, useEffect, useState } from 'react'

interface User {
  name: string
}

interface BlogProps {
  title: string
  id: string
  date: string
  url: string
  likeCount: number
  user: User
}

export default function Page() {
  const [blog, setBlog] = useState<BlogProps[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { activeOption } = useTapBarStore()
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const handleDeleteSession = (id: string) => {
    setBlog((prevblogs) => prevblogs.filter((blog) => blog.id !== id))
    setMessage('블로그 글이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }
  const getBestBlog = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/blogs/best?offset=0&limit=10', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
      }

      const result = await response.json()
      setBlog(result.data)
      console.log(blog)
      console.log('블로그api가 성공적으로 통신되었습니다:', result.data)
    } catch (err) {
      console.error('블로그 데이터 업로드 중 오류 발생:', err)
    }
  }, [blog])
  const getBlog = async () => {
    const baseUrl = '/api/v1/blogs'
    const params = {
      keyword: '',
      category: '',
      position: '',
      offset: String(0),
      limit: String(10),
    }

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== null && value !== '',
      ),
    )
    const queryString = new URLSearchParams(filteredParams).toString()
    const url = `${baseUrl}?${queryString}`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setBlog(data.data || [])
      })
  }
  useEffect(() => {
    if (activeOption == '금주의 블로그') {
      getBestBlog()
    } else if (activeOption == 'Techeer' || activeOption == 'Shared') {
      getBlog()
    }
  }, [activeOption, getBestBlog])

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
        <TapBar
          options={['금주의 블로그', 'Techeer', 'Shared']}
          placeholder="블로그 제목 혹은 이름을 검색해보세요"
          onSearch={handleSearch}
        />
        <div className="grid grid-cols-3 gap-8 mt-8">
          {blog.map((blog, index) => (
            <BlogPost
              key={index}
              title={blog.title}
              id={blog.id}
              date={blog.date}
              url={blog.url}
              likeCount={blog.likeCount}
              name={blog.user.name}
              onDelete={handleDeleteSession}
            />
          ))}
        </div>
      </div>
      <AddBtn />
    </div>
  )
}
