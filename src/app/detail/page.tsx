'use client'

import { useState } from 'react'
import { pdfjs } from 'react-pdf'
import Dropdown from '@/components/common/Dropdown'
import ProfileBox from '@/components/profile/ProfileBox'
import Image from 'next/image'
import PdfViewer from '@/components/resume/Pdf'
import Comments from '@/components/resume/Comments'
import Other from '@/components/resume/OtherResume'
import Create from '@/components/resume/CreateComment'
import Tap from '@/components/resume/Tap'

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

export default function Detail() {
  // 드롭다운 선택된 옵션 상태 관리
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showOther, setShowOther] = useState(false) // Other 컴포넌트 표시 여부 상태 추가

  // 드롭다운 항목 리스트
  const dropdownOptions = ['이력서1', '이력서2', '자기소개']

  const position = 'Frontend'
  const career = '신입'

  // 다른 사람 이력서 보기를 클릭했을 때 Ather 컴포넌트 표시 토글
  const handleToggleOther = () => {
    setShowOther((prev) => !prev) // 상태를 토글하여 보이기/숨기기 처리
  }

  return (
    <div className="flex justify-between mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6">
        <ProfileBox position={position} career={career} />
        <Tap />
        <div className="flex flex-col">
          <div
            className="flex justify-between items-center w-[14.25rem] h-[2.5rem] px-4 shadow-md border-2 border-primary rounded-xl font-medium text-[1rem]"
            onClick={handleToggleOther}
          >
            다른 사람 이력서 보기
            <Image src="/arrow.png" width={15} height={10} alt="arrow" />
          </div>
          {showOther && (
            <Other position={position} career={career} />
            // </div>
          )}
        </div>
      </div>

      {/** 우측 영역 */}
      <div className="flex flex-col gap-5">
        <Dropdown
          title="이력서 리스트"
          options={dropdownOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="flex w-[55rem] h-[50rem] gap-5">
          {/** pdf 이력서 */}

          <div className="flex w-[50rem] h-[60rem]">
            <PdfViewer />
          </div>
          {/** 버튼 */}
          <div className="flex flex-col gap-5">
            <button
              className="flex justify-center items-center w-[2.5rem] h-[2.5rem] shadow-md border border-gray outline-none rounded-full"
              type="button"
            >
              <Image
                src="/plus.png"
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
                  alt="PlusIMG"
                  // className="right-2 top-1/2 transform -translate-y-1/2"
                />
              </a>
            </button>
          </div>
        </div>
        {/** 댓글 */}
        <div className="flex flex-col gap-10">
          <Comments />
          <span className="flex items-center w-[47rem] border-[0.03rem] border-gray"></span>
          <Create />
        </div>
      </div>
    </div>
  )
}
