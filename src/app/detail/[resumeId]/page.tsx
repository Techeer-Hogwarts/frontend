'use client'

import { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import ProfileBox from '@/components/profile/ProfileBox'
import Image from 'next/image'
import Other from '@/components/resume/OtherResume'
import { fetchResumeById } from '../../resume/api/getResume'
import PdfViewer from '@/components/resume/Pdf'

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

  // 다른 사람 이력서 보기를 클릭했을 때 Ather 컴포넌트 표시 토글
  const handleToggleOther = () => {
    setShowOther((prev) => !prev) // 상태를 토글하여 보이기/숨기기 처리
  }

  // let comments = [
  //   {
  //     id: 1,
  //     name: '박철수',
  //     date: '2024.10.03',
  //     comment:
  //       '이 프로젝트는 협업과 커뮤니케이션에서 강점이 있었던 것 같습니다. 하지만 기술적으로 좀 더 개선할 부분이 있습니다.',
  //   },
  //   {
  //     id: 2,
  //     name: '김미영',
  //     date: '2024.10.02',
  //     comment:
  //       '해당 사례에서는 PM 직무에서 발휘할 만한 역량이 보이지가 않습니다. PM 중요 직무 역량 중 질문에 쓰일만한 사례를 추리고 그 역량을 분명히 드러내야 합니다. 해당 사례에서는 PM 직무에서 발휘할 만한 역량이 보이지가 않습니다. PM 중요 직무 역량 중 질문에 쓰일만한 사례를 추리고 그 역량을 분명히 드러내야 합니다.',
  //   },
  // ]

  useEffect(() => {
    async function loadResume() {
      try {
        const data = await fetchResumeById(Number(resumeId))
        setResume(data)
        console.log('detail 페이지 조회 성공')
      } catch (err: any) {
        setError(err.message)
      }
    }

    loadResume()
  }, [resumeId])

  // resume이 null인 경우 처리
  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  if (error) {
    return <div>Error: {error}</div>
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
        <ProfileBox position={career} career={userCareer} />
        <div className="flex flex-col">
          <div
            className="flex justify-between items-center w-[14.25rem] h-[2.5rem] px-4 shadow-md border-2 border-primary rounded-xl font-medium text-[1rem]"
            onClick={handleToggleOther}
          >
            이력서 리스트
            <Image src="/arrow.png" width={15} height={10} alt="arrow" />
          </div>
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