'use client'

import { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import ProfileBox from '@/components/profile/ProfileBox'
import Image from 'next/image'
import Other from '@/components/resume/OtherResume'
import { fetchResumeById } from '../../resume/api/getResume'
import PdfViewer from '@/components/resume/Pdf'
import EmptyLottie from '@/components/common/EmptyLottie'

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

interface ResumeData {
  title: string
  url: string
  category: string
  user: {
    name: string
    year: number
    isIntern: boolean
    profileImage: string
    mainPosition: string
    school: string
    createdAt: number
  }
}

export default function Detail({ params }: { params: { resumeId: string } }) {
  const { resumeId } = params
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showOther, setShowOther] = useState(false) // Other 컴포넌트 표시 여부 상태 추가

  const [profileData, setProfileData] = useState<any>(null)
  // 다른 사람 이력서 보기를 클릭했을 때 Ather 컴포넌트 표시 토글
  const handleToggleOther = () => {
    setShowOther((prev) => !prev) // 상태를 토글하여 보이기/숨기기 처리
  }

  useEffect(() => {
    async function loadResume() {
      try {
        const data = await fetchResumeById(Number(resumeId))
        setResume(data)
        setProfileData(data.user)
        console.log('detail 페이지 조회 성공')
      } catch (err: any) {
        setError(err.message)
      }
    }

    loadResume()
  }, [resumeId])

  if (error || profileData?.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyLottie
          text="이력서를 조회하는데 실패했습니다."
          link="다시 조회해주세요"
        />
      </div>
    ) // 오류 발생 시 표시할 문구
  }

  if (!resume) {
    return <div>No resume data available</div>
  }

  // 신입/경력 구분
  const isIntern = resume.user.isIntern
  const userCareer = isIntern ? '경력' : '신입'
  const career = 'Frontend'

  return (
    <div className="flex justify-between mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6">
        <ProfileBox profileData={profileData} />
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center w-[14.25rem] h-[2.5rem] px-4 shadow-md border-2 border-primary rounded-xl font-medium text-[1rem]"
            onClick={handleToggleOther}
          >
            이력서 리스트
            <Image src="/arrow.png" width={15} height={10} alt="arrow" />
          </button>
          {showOther && <Other id={1} offset={0} limit={10} />}
        </div>
      </div>

      {/** 우측 영역 */}
      <div className="flex flex-col">
        <div className="flex w-[55rem] h-[50rem] gap-5">
          {/** pdf 이력서 */}
          <div className="flex w-[50rem] h-[60rem]">
            <PdfViewer url={resume.url} />
          </div>
          {/** 버튼 */}
          <div className="flex flex-col gap-5">
            <button
              className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md border border-gray outline-none rounded-full"
              type="button"
            >
              <Image
                src="/grayplus.png"
                width={20}
                height={20}
                alt="PlusIMG"
                // className="right-2 top-1/2 transform -translate-y-1/2"
              />
            </button>
            <button
              className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md border border-gray outline-none rounded-full"
              type="button"
            >
              <a
                href="/f.pdf" // 다운로드할 PDF 파일 경로
                download="f.pdf" // 다운로드될 파일 이름 지정
                className="flex justify-center items-center w-[2rem] h-[2rem] outline-none"
              >
                <Image
                  src="/pdfdown.png"
                  width={20}
                  height={20}
                  alt="DownIMG"
                  // className="right-2 top-1/2 transform -translate-y-1/2"
                />
              </a>
            </button>
          </div>
        </div>
        {/** 댓글 */}
        {/* <div className="flex flex-col gap-10">
          <Comments comments={comments} />
          <span className="flex items-center w-[47rem] border-[0.03rem] border-gray"></span>
          <Create />
        </div> */}
      </div>
    </div>
  )
}
