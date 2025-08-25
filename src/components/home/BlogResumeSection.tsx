'use client'

import { useState, useEffect } from 'react'
import TabLayout from './TabLayout'
import BlogPost from '@/components/blog/BlogPost'
import ResumeFolder from '@/components/resume/ResumeFolder'
import { getLatestBlogPosts } from '@/api/home'
import { getLatestResumes } from '@/api/home'
import type { BlogPost as BlogPostType, Resume as ResumeType } from '@/api/home'

export default function BlogResumeSection() {
  const [selectedTab, setSelectedTab] = useState<'blog' | 'resume'>('blog')
  const [blogs, setBlogs] = useState<any>(null)
  const [resumes, setResumes] = useState<any>(null)
  const [blogLoading, setBlogLoading] = useState(true)
  const [resumeLoading, setResumeLoading] = useState(true)
  const [blogError, setBlogError] = useState<string | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)

  // 블로그 데이터 가져오기
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setBlogLoading(true)

        const apiUrl = `/api/v1/blogs?limit=4&sortBy=latest`

        const response = await getLatestBlogPosts(4)
        setBlogs(response)
      } catch (err) {
        setBlogError('블로그 데이터를 불러오는 중 오류가 발생했습니다.')
        setBlogs([])
      } finally {
        setBlogLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // 이력서 데이터 가져오기
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setResumeLoading(true)

        const apiUrl = `/api/v1/resumes?limit=4&sortBy=CREATEDAT`

        const response = await getLatestResumes(4)
        setResumes(response)
      } catch (err) {
        setResumeError('이력서 데이터를 불러오는 중 오류가 발생했습니다.')
        setResumes([])
      } finally {
        setResumeLoading(false)
      }
    }

    fetchResumes()
  }, [])

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

  if (isLoading) {
    return (
      <section className="w-full mt-8">
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
    <section className="w-full mt-8">
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
                  <div className="text-lg text-red-500">{blogError}</div>
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
                  <div className="text-lg text-red-500">{resumeError}</div>
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
