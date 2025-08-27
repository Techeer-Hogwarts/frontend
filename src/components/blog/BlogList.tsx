'use client'

import BlogPost from './BlogPost'
import Dropdown from '../common/Dropdown'
import EmptyLottie from '../common/EmptyLottie'
import BlogPostSkeleton from './BlogPostSkeleton'
import { useState } from 'react'
import { useTapBarStore } from '@/store/tapBarStore'
import { useBlogList } from '@/hooks/blog/useBlogList'

export default function BlogList({ searchResults }: { searchResults?: any }) {
  const { activeOption } = useTapBarStore()
  const [selectedSortBy, setSelectedSortBy] = useState<string[]>(['최신순'])
  const sortByOptions = ['최신순', '조회순', '가나다순']
  const { blog, isLoading, isInitialLoad, ref, likeDate, removeBlog } =
    useBlogList(selectedSortBy[0])
  const handleDeleteBlog = (blogId: string) => {
    removeBlog(blogId)
  }

  return (
    <div>
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        // 검색 결과가 있을 때
        <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
          {searchResults.map((result: any) => {
            // 검색 결과를 BlogPost에 맞는 형태로 변환
            const blogData = {
              id: result.id,
              title: result.title,
              category: 'SHARED', // 검색 결과에 없으므로 기본값
              date: result.date,
              url: result.url,
              likeCount: 0, // 검색 결과에 없으므로 기본값
              userName: result.userName,
              userImage: result.userProfileImage,
              image: result.thumbnail || '',
              authorImage: result.userProfileImage,
              authorName: result.userName,
              stack: result.stack || [],
            }

            return (
              <BlogPost
                key={result.id}
                {...blogData}
                onDelete={handleDeleteBlog}
                likeList={likeDate || []}
              />
            )
          })}
        </div>
      ) : isInitialLoad ? (
        <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      ) : !isLoading && blog && blog.length === 0 ? (
        <div className="flex justify-center">
          <EmptyLottie
            text="블로그 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        </div>
      ) : blog && !isInitialLoad ? (
        <>
          <div className="flex justify-end my-5">
            {activeOption !== '블로깅 챌린지' && (
              <Dropdown
                title={selectedSortBy[0] || '최신순'}
                options={sortByOptions}
                selectedOptions={selectedSortBy}
                setSelectedOptions={setSelectedSortBy}
                singleSelect={true}
              />
            )}
          </div>
          {!isLoading && blog && blog.length === 0 && (
            <div className="flex justify-center">
              <EmptyLottie
                text="블로그 데이터가 없습니다."
                text2="다시 조회해주세요"
              />
            </div>
          )}
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
      ) : null}
    </div>
  )
}
