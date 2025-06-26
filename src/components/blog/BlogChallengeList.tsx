'use client'

import { useGetLikesAPI } from '@/api/likes/likes'
import EmptyLottie from '../common/EmptyLottie'
import BlogPost from './BlogPost'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { getBlogChallengeBlogsAPI } from '@/api/blog/blog'

interface BlogChallengeListProps {
  data: {
    blogId: number
    title: string
    url: string
    author: string
    createdAt: string
    viewCount: number
    likeCount: number
  }
  hasNext: boolean
  nextCursor: number | null
}

export default function BlogChallengeList(sortBy: string = '최신순') {
  const sortByValue =
    sortBy === '조회순'
      ? 'viewCount'
      : sortBy === '가나다순'
        ? 'name'
        : 'latest'
  const { data: likeDate } = useGetLikesAPI('BLOG', 0, 50)
  const [ref, inView] = useInView({ threshold: 0.5 })
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [hasNext, setHasNext] = useState(true)
  const [blogs, setBlogs] = useState<BlogChallengeListProps['data'][]>([])
  useEffect(() => {
    getBlogChallengeBlogsAPI(sortByValue, 8, cursor).then((data) => {
      setBlogs(data)
      setHasNext(data.hasNext)
    })
  }, [])
  return (
    <div className="flex flex-col items-center">
      {blogs.length === 0 ? (
        <EmptyLottie
          text="블로그 데이터가 없습니다."
          text2="다시 조회해주세요"
        />
      ) : (
        <div className="mt-8 grid grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <BlogPost
              key={index}
              id={String(blog.blogId)}
              title={blog.title}
              url={blog.url}
              likeCount={blog.likeCount}
              authorName={blog.author}
              likeList={likeDate || []}
              userName={null}
              userImage={null}
              image={null}
              authorImage={null}
              category={null}
              date={null}
              onDelete={null}
            />
          ))}
        </div>
      )}
      <div ref={ref} className="h-10 mt-4" />
    </div>
  )
}
