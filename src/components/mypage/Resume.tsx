'use client'

import React, { useEffect, useState } from 'react'
import ResumeFolder from '../resume/ResumeFolder'
import AddResume from './AddResume'
import Link from 'next/link'
import { fetchUserResumes } from '@/app/resume/api/getUserResume'
import { usePathname } from 'next/navigation'
import AuthModal from '@/components/common/AuthModal'
import { useAuthStore } from '@/store/authStore'
import SkeletonResumeFolder from '@/components/resume/SkeletonResume' // 스켈레톤 UI

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
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, checkAuth } = useAuthStore()

  // '마이페이지' 여부
  const isMyPage = pathname === '/mypage'

  // API 호출
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
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    // 로그인 상태가 바뀔 때마다 데이터를 다시 불러옴
    fetchData()
  }, [userId, offset, limit, user])

  // user === null이면 인증 모달 표시
  useEffect(() => {
    if (!isLoading && user === null) {
      setAuthModalOpen(true)
    } else {
      setAuthModalOpen(false)
    }
  }, [user, isLoading])

  const handleClickAddResume = () => {
    setModal(!modal)
  }

  // 렌더
  return (
    <div>
      {/* 인증 모달 */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* 상단 영역 */}
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

      {/* 메인 렌더 */}
      {isLoading ? (
        // 로딩 중 → 스켈레톤
        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonResumeFolder key={i} />
          ))}
        </div>
      ) : isError ? (
        // 에러
        <div className="text-center text-gray">이력서를 불러오는 중 오류가 발생했습니다.</div>
      ) : data.length === 0 ? (
        // 이력서 데이터가 없음
        <div className="text-center text-gray">등록된 이력서가 없습니다.</div>
      ) : (
        // 정상 데이터
        <Link href={`/resume/$[resume.id]`}>
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
