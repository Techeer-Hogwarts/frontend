'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { BiSolidPencil } from 'react-icons/bi'

export default function AddProfile({ projectData, onUpdate }) {
  const [imgSrc, setImgSrc] = useState<string | null>('') // 기본 이미지 설정
  const fileInput = useRef<HTMLInputElement>(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    onUpdate(name, value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setImgSrc(imageUrl) // 미리보기
        onUpdate('projectImage', imageUrl) // 부모 컴포넌트에 이미지 업데이트
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col w-[19rem]">
      {/* ====== 상단 탭 부분 ====== */}
      <div className="flex items-end">
        {/* 탭 직사각형 */}
        <div className="w-[6rem] h-[1.5rem] flex items-center justify-center rounded-t-md shadow-cardtop text-sm font-semibold bg-lightgray" />
        {/* 탭 삼각형 */}
        <div
          className="w-1 h-[1.2rem] shadow-md bg-lightgray"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        />
      </div>

      {/* ====== 메인 본체 ====== */}
      <div className="w-[19rem] min-h-[28rem] rounded-b-lg rounded-tr-lg shadow-card flex flex-col items-center p-[1.438rem]">
        {/* ==== 메인 콘텐츠 ==== */}
        <div className="flex flex-col items-center">
          <div
            onChange={handleInputChange}
            className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white justify-center text-center items-center text-[1.5rem] font-bold"
          >
            {projectData.name}
          </div>

          <div className="flex w-[15.875rem] justify-between items-center mt-[1rem] mb-[1.5rem]">
            <div>
              <p className="text-sm mb-1 text-gray">
                스터디 이름을 입력해주세요{' '}
                <span className="text-primary">*</span>
              </p>
              <input
                name="name"
                value={projectData.name}
                onChange={handleInputChange}
                className="font-medium w-[15.8125rem] h-[1.875rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
                placeholder="스터디 이름"
              />
            </div>
          </div>

          <div className="w-[15.875rem] flex flex-col gap-2">
            <p className="text-sm mb-1 text-gray">관련 링크를 입력해주세요</p>

            <div className="flex gap-2 flex-col">
              <div className="flex justify-between items-center gap-1">
                <div className="w-[4.41919rem] h-[1.5625rem] border border-primary rounded-[0.19rem] text-primary text-center">
                  노션
                </div>
                <input
                  name="notionLink"
                  value={projectData.notionLink}
                  onChange={handleInputChange}
                  className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
                  placeholder="노션 주소"
                />
              </div>
            </div>
          </div>

          <div className="w-[15.875rem] mt-4">
            <p className="text-sm mb-1 text-gray">스터디 설명을 입력해주세요</p>
            <textarea
              name="studyExplain"
              value={projectData.studyExplain}
              onChange={handleInputChange}
              maxLength={200}
              className="w-full p-2 border border-gray rounded-lg focus:outline-none resize-none
"
              rows={7}
            />
            <p className="text-right text-xs mt-1 whitespace-pre-wrap">
              {projectData?.studyExplain?.length}/200
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
