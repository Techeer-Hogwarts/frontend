'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { BiSolidPencil } from 'react-icons/bi'

interface AddProfileProps {
  /** 'project' 또는 'study' 중 어떤 모드인지 지정 */
  variant: 'project' | 'study'
  /** 공통으로 사용하는 데이터 객체 (name 외에 variant별 추가 필드) */
  projectData: {
    name: string
    // project variant 용
    mainImage?: File | null
    githubLink?: string
    notionLink?: string
    projectExplain?: string
    existingMainImageUrl?: string
    existingMainImageId?: number | null
    // study variant 용
    studyExplain?: string
    [key: string]: any
  }
  /** 변경된 값을 상위로 전달하는 콜백 */
  onUpdate: (key: string, value: any) => void
  /** 기존 이미지 삭제 처리 콜백 (project variant에서만 사용) */
  existingMainImageUrl?: string
  existingMainImageId?: number | null
  onDeleteOldMainImage?: (oldId: number) => void
}

export default function AddProfile({
  variant,
  projectData,
  onUpdate,
  existingMainImageUrl,
  existingMainImageId,
  onDeleteOldMainImage,
}: AddProfileProps) {
  const [imgSrc, setImgSrc] = useState<string>('')
  const fileInput = useRef<HTMLInputElement>(null)

  // project variant에서만 이미지 URL 업데이트 로직 실행
  useEffect(() => {
    if (variant === 'project') {
      if (projectData.mainImage) {
        setImgSrc(URL.createObjectURL(projectData.mainImage))
      } else if (existingMainImageUrl) {
        setImgSrc(existingMainImageUrl)
      } else {
        setImgSrc('')
      }
    }
  }, [variant, projectData.mainImage, existingMainImageUrl])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    onUpdate(name, value)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 기존 이미지가 있으면 삭제 요청
    if (projectData.existingMainImageId && onDeleteOldMainImage) {
      onDeleteOldMainImage(projectData.existingMainImageId)
    }

    // 미리보기 및 상위 state 업데이트
    setImgSrc(URL.createObjectURL(file))
    onUpdate('mainImage', file)
  }

  return (
    <div className="flex flex-col w-[19rem]">
      {/* ====== 탭 UI ====== */}
      <div className="flex items-end">
        <div className="w-[6rem] h-[1.5rem] rounded-t-md shadow-cardtop bg-lightgray" />
        <div
          className="w-1 h-[1.2rem] shadow-md bg-lightgray"
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        />
      </div>

      {/* ====== 컨텐츠 영역 ====== */}
      <div className="w-[19rem] min-h-[28rem] rounded-b-lg rounded-tr-lg shadow-card flex flex-col items-center p-[1.438rem]">
        {/* 이미지 또는 스터디 배경 */}
        <div className="relative w-[254px] h-[254px] flex justify-center items-center">
          {variant === 'project' ? (
            imgSrc ? (
              <Image
                src={imgSrc}
                alt="Uploaded Preview"
                width={254}
                height={254}
                className="rounded-2xl bg-contain"
              />
            ) : (
              <div className="flex flex-col w-full h-full bg-lightgray text-gray items-center justify-center gap-4 rounded-2xl">
                <FaRegImage size={30} />
                <div className="text-center">
                  <p>눌러서 이미지를 업로드해주세요</p>
                  <p>jpg, jpeg, png, gif 가능</p>
                </div>
              </div>
            )
          ) : (
            <div className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white justify-center items-center text-[1.5rem] font-bold">
              {projectData.name}
            </div>
          )}

          {variant === 'project' && (
            <>
              <label
                htmlFor="image"
                className="absolute bottom-[-1rem] right-[-1rem] cursor-pointer"
              >
                <div className="w-10 h-10 bg-lightgray border border-white rounded-full flex items-center justify-center">
                  <div className="border rounded-full p-2 border-white">
                    <BiSolidPencil color="white" />
                  </div>
                </div>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInput}
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        {/* 이름 입력 */}
        <div className="flex w-[15.875rem] justify-between items-center mt-[1rem] mb-[1.5rem]">
          <div>
            <p className="text-sm mb-1 text-gray">
              {variant === 'project'
                ? '프로젝트 이름을 입력해주세요'
                : '스터디 이름을 입력해주세요'}{' '}
              <span className="text-primary">*</span>
            </p>
            <input
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              className="w-[15.8125rem] h-[1.875rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none font-medium"
              placeholder={
                variant === 'project' ? '프로젝트 이름' : '스터디 이름'
              }
            />
          </div>
        </div>

        {/* 링크 입력 */}
        <div className="w-[15.875rem] flex flex-col gap-2">
          <p className="text-sm mb-1 text-gray">관련 링크를 입력해주세요</p>
          <div className="flex flex-col gap-2">
            {variant === 'project' && (
              <div className="flex justify-between items-center gap-1">
                <div className="w-[4.41919rem] text-center h-[1.5625rem] border border-primary rounded-[0.19rem] text-primary">
                  깃허브
                </div>
                <input
                  name="githubLink"
                  value={projectData.githubLink || ''}
                  onChange={handleInputChange}
                  className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
                  placeholder="레포지토리 주소"
                />
              </div>
            )}
            <div className="flex justify-between items-center gap-1">
              <div className="w-[4.41919rem] text-center h-[1.5625rem] border border-primary rounded-[0.19rem] text-primary">
                노션
              </div>
              <input
                name="notionLink"
                value={projectData.notionLink || ''}
                onChange={handleInputChange}
                className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
                placeholder="노션 주소"
              />
            </div>
          </div>
        </div>

        {/* 설명 입력 */}
        <div className="w-[15.875rem] mt-4">
          <p className="text-sm mb-1 text-gray">
            {variant === 'project'
              ? '프로젝트 설명을 입력해주세요'
              : '스터디 설명을 입력해주세요'}
          </p>
          <textarea
            name={variant === 'project' ? 'projectExplain' : 'studyExplain'}
            value={
              variant === 'project'
                ? projectData.projectExplain || ''
                : projectData.studyExplain || ''
            }
            onChange={handleInputChange}
            maxLength={200}
            rows={7}
            className="w-full p-2 border border-gray rounded-lg focus:outline-none resize-none"
          />
          <p className="text-right text-xs mt-1 whitespace-pre-wrap">
            {
              (variant === 'project'
                ? projectData.projectExplain || ''
                : projectData.studyExplain || ''
              ).length
            }
            /200
          </p>
        </div>
      </div>
    </div>
  )
}
