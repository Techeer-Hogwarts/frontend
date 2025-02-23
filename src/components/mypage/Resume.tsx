'use client'

import React, { useEffect, useState } from 'react'
import ResumeFolder from '../resume/ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'
import { ResumeQueryParams } from '@/types/queryParams'
import { useGetResumeQuery } from '@/app/resume/query/useGetResumeQuery'
import { fetchUserResumes } from '@/app/resume/api/getUserResume'
import { usePathname } from 'next/navigation'

interface Resume {
  id: number
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
}

export default function Resume({
  userId,
  offset,
  limit,
}: {
  userId: number
  offset: number
  limit: number
}) {
  const [data, setData] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [modal, setModal] = useState(false)

    const pathname = usePathname()
  const isMyPage = pathname === '/mypage'

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const result = await fetchUserResumes(userId, offset, limit)
      setData(result.data || [])
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId, offset, limit])

  const handleClickAddResume = () => {
    setModal(!modal)
  }
  return (
    <div>
      <div className="flex w-[890px] justify-end mb-4">
      {isMyPage && (
        <button
          onClick={handleClickAddResume}
          className="border border-lightgray text-black flex items-center justify-center p-2 h-8 w-[130px] rounded-md"
        >
          이력서 추가
        </button>
        )}
        {modal && <AddResume setModal={setModal} fetchData={fetchData} />}
      </div>
      {data.length === 0 ? (
        // (A) 이력서 데이터가 없을 때
        <div className="text-center text-gray">
          등록된 이력서가 없습니다.
        </div>
      ) : (
        // (B) 이력서 데이터가 있을 때
        <Link href={`/resume/$[resume.id]`} >
          <div className="grid grid-cols-3 gap-8">
            {data.map((resume: Resume) => (
              <ResumeFolder key={resume.id} resume={resume} />
            ))}
          </div>
        </Link>
      )}
    </div>
  )
}
