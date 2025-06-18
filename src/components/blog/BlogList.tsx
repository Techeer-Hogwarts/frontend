'use client'

import BlogPost from './BlogPost'
import BlogPostSkeleton from './BlogPostSkeleton'
import EmptyLottie from '../common/EmptyLottie'
import { useBlogList } from '@/hooks/blog/useBlogList'
import Dropdown from '../common/Dropdown'
import { useState } from 'react'

export default function BlogList() {
  const [selectedSortBy, setSelectedSortBy] = useState<string[]>(['최신순'])
  const sortByOptions = ['최신순', '조회순', '가나다순']

  const { blog, isLoading, isInitialLoad, ref, likeDate, removeBlog } = useBlogList(selectedSortBy[0])
  const handleDeleteBlog = (blogId: string) => {
    removeBlog(blogId)
  }

  return (
    <div>
      {isInitialLoad && (
        <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      )}
      {!isLoading && blog && blog.length === 0 && (
        <div className="flex justify-center">
          <EmptyLottie
            text="블로그 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        </div>
      )}
      {blog && !isInitialLoad && (
        <>
          <div className='flex justify-end my-5'>
            <Dropdown
              title={selectedSortBy[0] || '최신순'} 
              options={sortByOptions}
              selectedOptions={selectedSortBy}
              setSelectedOptions={setSelectedSortBy}
              singleSelect={true}
            />
          </div>
          <div className="grid grid-cols-4 gap-8">
            {blog.map((blog, index) => (
              <BlogPost
                key={index}
                id={blog.id}
                title={blog.title}
                category={blog.category}
                date={blog.date}
                url={blog.url}
                likeCount={blog.likeCount}
                userName={blog.user.name}
                userImage={blog.user.profileImage}
                image={blog.thumbnail}
                authorImage={blog.author.authorImage}
                authorName={blog.author.authorName}
                onDelete={handleDeleteBlog}
                likeList={likeDate || []}
              />
            ))}
          <div ref={ref} />
        </div>
      </>
      )}
    </div>
  )
}
