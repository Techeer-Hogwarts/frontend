'use client'

import React, { useEffect, useState } from 'react'
import ResumeFolder from './ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'
import { ResumeQueryParams } from '@/types/queryParams'
import { fetchUserResumes } from '@/app/resume/api/getUserResume'
import { useInView } from 'react-intersection-observer'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume'
import { usePathname } from 'next/navigation'

interface Resume {
  id: string
  createdAt: number
  title: string
  category: string
  position: string
  likeCount: number
  year: string
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
  likeList: string[]
  bookmarkList: string[]
}

export default function Resume({ userId }) {
  const [data, setData] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [modal, setModal] = useState(false)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [limit, setLimit] = useState(6)
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [likeList, setLikeList] = useState<string[]>([])
  const { fetchLikes } = useLike()
  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const { fetchBookmarks } = useBookmark()

  const pathname = usePathname()
  const isMyPage = pathname === '/mypage'

  // API 호출
  const fetchData = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const result = await fetchUserResumes(userId)
      setData(result.data || [])
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const checkLike = async () => {
    try {
      const data = await fetchLikes('RESUME', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const checkBookmark = async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const handleLikeUpdate = (resumeId: string, newLikeCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, likeCount: newLikeCount }
          : resume,
      ),
    )
  }

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, bookmarkCount: newBookmarkCount }
          : resume,
      ),
    )
  }

  useEffect(() => {
    // 로그인 상태가 바뀔 때마다 데이터를 다시 불러옴
    fetchData()
    setResumes([])
    setLimit(8)
    checkLike()
    checkBookmark()
  }, [userId, limit])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setResumes((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newResumes = data.filter((p) => !existingIds.has(p.id)) // 중복 제거
        return [...prev, ...newResumes]
      })
    }
  }, [data])

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 4)
    }
  }, [inView])

  const handleClickAddResume = () => {
    setModal(!modal)
  }

  // 렌더
  return (
    <div>
      {/* 상단 영역 */}
      <div className="flex w-[890px] justify-end mb-4">
        {isMyPage && (
          <button
            onClick={handleClickAddResume}
            className="border border-lightgray text-black flex items-center justify-center p-2 h-8 w-[130px] rounded-md hover:bg-lightprimary hover:text-primary hover:border-primary hover:font-medium"
          >
            이력서 추가
          </button>
        )}
        {modal && <AddResume setModal={setModal} fetchData={fetchData} />}
      </div>

      <Link href={`/resume/$[resume.id]`}>
        <div className="grid grid-cols-3 gap-8">
          {isLoading && (
            <div className="flex gap-10">
              <SkeletonResumeFolder />
              <SkeletonResumeFolder />
              <SkeletonResumeFolder />
            </div>
          )}

          {resumes.map((resume) => (
            <ResumeFolder
              key={resume.id}
              likeCount={resume.likeCount}
              resume={resume}
              likeList={likeList}
              onLikeUpdate={handleLikeUpdate}
              bookmarkList={bookmarkList}
              onBookmarkUpdate={handleBookmarkUpdate}
            />
          ))}
        </div>
      </Link>
      {/* )} */}
    </div>
  )
}
