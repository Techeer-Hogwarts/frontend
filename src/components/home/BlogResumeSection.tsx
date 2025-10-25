'use client'

import { useState } from 'react'
import TabLayout from './TabLayout'
import BlogPost from '@/components/blog/BlogPost'
import ResumeFolder from '@/components/resume/ResumeFolder'
import {
  useLatestBlogPostsQuery,
  useLatestResumesQuery,
} from '@/api/home/queries'

export default function BlogResumeSection() {
  const [selectedTab, setSelectedTab] = useState<'blog' | 'resume'>('blog')

  const {
    data: blogs,
    isLoading: blogLoading,
    error: blogError,
  } = useLatestBlogPostsQuery(4)

  const {
    data: resumes,
    isLoading: resumeLoading,
    error: resumeError,
  } = useLatestResumesQuery(4)

  const transformedBlogs = Array.isArray(blogs?.data)
    ? blogs.data.map((blog: any) => ({
        id: blog.id.toString(),
        title: blog.title,
        date: blog.date,
        userName: blog.user?.name || '',
        userImage: blog.user?.profileImage || '',
        category: blog.category,
        likeCount: blog.likeCount,
        url: blog.url,
        image: blog.thumbnail,
        likeList: [],
        authorName: blog.author?.authorName || '',
        authorImage: blog.author?.authorImage || '',
        onDelete: () => {},
      }))
    : []

  const transformedResumes = Array.isArray(resumes?.data)
    ? resumes.data.map((resume: any) => ({
        id: resume.id,
        createdAt: resume.createdAt,
        title: resume.title,
        category: resume.category,
        position: resume.position,
        likeCount: resume.likeCount,
        year: resume.year,
        user: resume.user,
        likeList: resume.likeList || [],
        bookmarkList: resume.bookmarkList || [],
      }))
    : []

  const isLoading = blogLoading || resumeLoading

  const blogErrorMessage =
    blogError?.message || '블로그 데이터를 불러오는 중 오류가 발생했습니다.'
  const resumeErrorMessage =
    resumeError?.message || '이력서 데이터를 불러오는 중 오류가 발생했습니다.'

  if (isLoading) {
    return (
      <section className="w-full">
        <TabLayout
          iconSrc="/images/home/Trend.svg"
          iconWidth={40}
          iconHeight={30}
          tabs={[
            { label: '블로그', value: 'blog' },
            { label: '이력서', value: 'resume' },
          ]}
          selectedTab={selectedTab}
          onSelect={(tab: 'blog' | 'resume') => setSelectedTab(tab)}
        >
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-lg text-gray-500">로딩 중...</div>
          </div>
        </TabLayout>
      </section>
    )
  }

  return (
    <section className="w-full">
      <TabLayout
        iconSrc="/images/home/Trend.svg"
        iconWidth={40}
        iconHeight={30}
        tabs={[
          { label: '블로그', value: 'blog' },
          { label: '이력서', value: 'resume' },
        ]}
        selectedTab={selectedTab}
        onSelect={(tab: 'blog' | 'resume') => setSelectedTab(tab)}
      >
        <div className="grid grid-cols-4 gap-[2.5rem] min-h-[300px]">
          {selectedTab === 'blog' && (
            <>
              {blogError ? (
                <div className="col-span-4 flex items-center justify-center">
                  <div className="text-lg text-red-500">{blogErrorMessage}</div>
                </div>
              ) : transformedBlogs.length > 0 ? (
                transformedBlogs.map((blog) => (
                  <BlogPost key={blog.id} {...blog} />
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center">
                  <div className="text-lg text-gray-500">
                    블로그 포스트가 없습니다.
                  </div>
                </div>
              )}
            </>
          )}

          {selectedTab === 'resume' && (
            <>
              {resumeError ? (
                <div className="col-span-4 flex items-center justify-center">
                  <div className="text-lg text-red-500">
                    {resumeErrorMessage}
                  </div>
                </div>
              ) : transformedResumes.length > 0 ? (
                transformedResumes.map((resume) => (
                  <ResumeFolder
                    key={resume.id}
                    resume={resume}
                    likeCount={resume.likeCount}
                    likeList={resume.likeList}
                    bookmarkList={resume.bookmarkList}
                    onLikeUpdate={() => {}}
                    onBookmarkUpdate={() => {}}
                  />
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center">
                  <div className="text-lg text-gray-500">
                    이력서가 없습니다.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </TabLayout>
    </section>
  )
}
