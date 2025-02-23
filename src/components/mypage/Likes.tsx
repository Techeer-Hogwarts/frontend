'use client'

import { useEffect, useState } from 'react'
import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'
import { useLike } from '@/app/blog/_lib/useLike'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import BlogPost from '../blog/BlogPost'
import Skeleton from './Skeleton'
const tapBarOptions = ['세션영상', '블로그', '이력서']

export default function Likes() {
  const { fetchLikes } = useLike()
  const [limit, setLimit] = useState(6)
  const [likeList, setLikeList] = useState([])
  const [likes, setLikes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const { activeOption, setActiveOption } = useTapBarStore()
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView()
  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const checkLike = async () => {
    const category =
      activeOption === '이력서'
        ? 'RESUME'
        : activeOption === '블로그'
          ? 'BLOG'
          : 'SESSION'
    try {
      const checkData = await fetchLikes(category, 0, 50)
      setLikeList(checkData)
      const data = await fetchLikes(category, 0, limit)
      setLikes(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  useEffect(() => {
    setLimit(6)
    checkLike()
    setLikeList([])
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1300)
  }, [activeOption])

  useEffect(() => {
    // if (limit !== 6) {
    checkLike()
    // }
  }, [limit])

  useEffect(() => {
    if (!inView) return
    if (inView) {
      setLimit(limit + 6)
    }
  }, [inView])
  const handleCategoryChange = () => {
    // 카테고리가 변경되면 해당 카테고리에 맞는 블로그 데이터를 가져옵니다.
    setLimit(3) // 페이지네이션 초기화
    checkLike()
  }
  return (
    <div className="w-[890px]">
        <TapBar options={tapBarOptions} onSelect={handleCategoryChange} />
        <div className="flex w-full h-[1px] mt-5 bg-gray" />

      <div className="grid grid-cols-2 gap-8 mt-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : likes.map((like: any) => {
              if (activeOption === '블로그') {
                return (
                  <BlogPost
                    key={like.id}
                    title={like.title}
                    id={like.id}
                    date={like.date}
                    url={like.url}
                    likeCount={like.likeCount}
                    name={like.author?.authorName || ''}
                    authorImage={like.author?.authorImage}
                    image={like.thumbnail}
                    onDelete={like}
                    likeList={likeList}
                  />
                )
              } else if (activeOption === '세션영상') {
                return (
                  <SessionPost
                    key={like.id}
                    likeCount={like.likeCount}
                    id={like.id}
                    thumbnail={like.thumbnail}
                    title={like.title}
                    date={like.date}
                    presenter={like.presenter}
                    fileUrl={like.fileUrl}
                    showMessage={like}
                    userImage={like.user.profileImage}
                    likeList={likeList}
                    onLikeUpdate={like}
                  />
                )
              }
              return null
            })}
        <div ref={ref} />
      </div>
    </div>
  )
}
