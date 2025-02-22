'use client'

import { useEffect, useState } from 'react'
import ProfileBox from '@/components/profile/ProfileBox'
import Image from 'next/image'
import Other from '@/components/resume/OtherResume'
import { fetchResumeById } from '@/app/resume/api/getResume'
import EmptyLottie from '@/components/common/EmptyLottie'
import { useParams } from 'next/navigation'
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
    // school: string
    // grade: string
    // email: string
    // githubUrl: string
    // mediumUrl: string
    // velogUrl: string
    // tistoryUrl: string
  }
}

export default function Detail({ params }: { params: { resumeId: string } }) {
  const { resumeId } = useParams() as { resumeId: string }
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showOther, setShowOther] = useState(false) // Other 컴포넌트 표시 여부 상태 추가
  const [profileData, setProfileData] = useState<any>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 다른 사람 이력서 보기를 클릭했을 때 Other 컴포넌트 표시 토글
  const handleToggleOther = () => {
    setShowOther((prev) => !prev) // 상태를 토글하여 보이기/숨기기 처리
  }

  useEffect(() => {
    async function loadResume() {
      try {
        const data = await fetchResumeById(Number(resumeId))
        console.log('Fetched resume data:', data)
        setResume(data)
        setProfileData(data.user)
        setIsLoading(false)
        console.log('detail 페이지 조회 성공', data)
      } catch (err: any) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadResume()
  }, [resumeId])

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Skeleton />
      </div>
    )
  }

  if (error || profileData?.length === 0 || !resume) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="이력서를 조회하는데 실패했습니다."
          text2="다시 조회해주세요"
        />
      </div>
    ) // 오류 발생 시 표시할 문구
  }

  // Google Drive PDF 미리보기 URL 수정
  const pdfPreviewUrl = `https://drive.google.com/file/d/${resume.url.split('/d/')[1].split('/')[0]}/preview`
  const pdfDownloadUrl = `https://drive.google.com/uc?export=download&id=${resume.url.split('/d/')[1].split('/')[0]}` // 다운로드 링크

  // 신입/경력 구분
  // const isIntern = resume.user.isIntern
  // const userCareer = isIntern ? '경력' : '신입'
  // const career = 'Frontend'

  return (
    <div className="flex justify-between mt-10">
      {/** 좌측 영역 */}
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
          {showOther && <Other id={profileData.id} offset={0} limit={10} />}
        </div>
      </div>

      {/** 우측 영역 */}
      <div className="flex flex-col">
        <div className="flex w-[55rem] h-[50rem] gap-5">
          {/** pdf 이력서 */}
          <div className="flex w-[50rem] h-[55rem]">
            <iframe
              src={pdfPreviewUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Resume PDF"
            ></iframe>
          </div>
          {/** 버튼 */}
          <div className="flex flex-col gap-5">
            <button
              className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md border border-gray outline-none rounded-full"
              type="button"
            >
              <a
                href={pdfDownloadUrl} // 다운로드할 PDF 파일 경로
                download="name.pdf" // 다운로드될 파일 이름 지정
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
    </div>
  )
}
