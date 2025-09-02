'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import ProfileBox from '@/components/profile/ProfileBox'
import Other from '@/components/resume/OtherResume'
import { fetchResumeById } from '@/app/(protected)/resume/api/getResume'
import EmptyLottie from '@/components/common/EmptyLottie'

import Skeleton from '@/components/resume/Skeleton'

interface ResumeData {
  id: number
  createdAt: number
  title: string
  url: string
  category: string
  position: string
  likeCount: number
  user: {
    id: number
    name: string
    profileImage: string
    year: number
    mainPosition: string
  }
}

export default function Detail({
  params,
}: {
  params: Promise<{ resumeId: string }>
}) {
  const [resumeId, setResumeId] = useState<string>('')

  // 로딩 / 에러 상태
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 이력서 데이터
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [profileData, setProfileData] = useState<any>(null)

  // OtherResume 표시
  const [showOther, setShowOther] = useState(false)

  // params에서 resumeId 추출
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setResumeId(resolvedParams.resumeId)
    }
    getParams()
  }, [params])

  // 2) 이력서 데이터 로드
  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId) return

      try {
        setIsLoading(true)
        setError(null)

        const data = await fetchResumeById(Number(resumeId))
        setResume(data)
        setProfileData(data.user)
      } catch (err: any) {
        console.error('이력서 가져오기 실패:', err)
        setError(err.message || '이력서 불러오기 실패')
      } finally {
        setIsLoading(false)
      }
    }
    loadResume()
  }, [resumeId])

  // Other 컴포넌트 표시 토글
  const handleToggleOther = () => {
    setShowOther((prev) => !prev)
  }

  // (A) 오른쪽 영역 렌더 함수
  const renderRightSide = () => {
    if (error || !resume) {
      // 에러 상태 or resume가 null
      return (
        <div className="w-[55.625rem] text-center text-gray">
          이력서를 불러오는 중 오류가 발생했습니다.
        </div>
      )
    }

    if (!resume.url || !resume.url.includes('/d/')) {
      // url이 없거나 Drive 링크 아님
      return (
        <div className="w-[55.625rem] text-center text-gray">
          등록된 이력서가 없습니다.
        </div>
      )
    }

    // 정상 데이터
    const driveId = resume.url.split('/d/')[1].split('/')[0]
    const pdfPreviewUrl = `https://drive.google.com/file/d/${driveId}/preview`
    const pdfDownloadUrl = `https://drive.google.com/uc?export=download&id=${driveId}`

    return (
      <div className="flex flex-col">
        <div className="flex w-[55.625rem] h-[50rem] gap-5">
          {/* pdf 이력서 */}
          <div className="flex w-[50rem] h-[55rem]">
            <iframe
              src={pdfPreviewUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Resume PDF"
            ></iframe>
          </div>

          {/* 다운로드 버튼 */}
          <div className="flex flex-col gap-5">
            <button
              className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md border border-gray outline-none rounded-full"
              type="button"
            >
              <a
                href={pdfDownloadUrl}
                download="name.pdf"
                className="flex justify-center items-center w-[2rem] h-[2rem] outline-none"
              >
                <Image
                  src="/pdfdown.png"
                  width={20}
                  height={20}
                  alt="DownIMG"
                />
              </a>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        // 로딩 중: 왼/오른쪽 모두 스켈레톤
        <Skeleton />
      ) : (
        <div className="flex justify-between mt-10 gap-[4.375rem]">
          {/* 왼쪽 영역 (항상 표시) */}
          <div className="flex flex-col w-[15rem] gap-6">
            <ProfileBox profile={profileData} loading={false} error={''} />
            <div className="flex flex-col">
              <button
                className="flex justify-between items-center w-[14.25rem] h-[2.5rem] px-4 shadow-md border-2 border-primary rounded-xl font-medium text-[1rem]"
                onClick={handleToggleOther}
              >
                이력서 리스트
                <Image src="/arrow.png" width={15} height={10} alt="arrow" />
              </button>
              {showOther && profileData && (
                <Other id={profileData.id} offset={0} limit={10} />
              )}
            </div>
          </div>
          {renderRightSide()}
        </div>
      )}
    </>
  )
}
