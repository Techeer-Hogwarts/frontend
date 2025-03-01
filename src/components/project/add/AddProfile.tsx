'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { BiSolidPencil } from 'react-icons/bi'

interface AddProfileProps {
  projectData: {
    name: string
    mainImageFile?: File | null
    [key: string]: any
  }
  onUpdate: (key: string, value: any) => void

  // 새롭게 추가한 prop: 기존 메인이미지 URL
  existingMainImageUrl?: string // 기존 메인 이미지 URL
  existingMainImageId?: number | null // 기존 메인 이미지 ID
  onDeleteOldMainImage?: (oldId: number) => void
}

export default function AddProfile({
  projectData,
  onUpdate,
  existingMainImageUrl = '',
  existingMainImageId = null,
  onDeleteOldMainImage,
}: AddProfileProps) {
  const [imgSrc, setImgSrc] = useState<string>('') // 미리보기용
  const [projectType, setProjectType] = useState<null | string>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  // 만약 새로 업로드한 File이 없고, 기존 URL이 있으면 → 그걸 보여주기
  useEffect(() => {
    if (projectData.mainImageFile) {
      // 새 파일 업로드 → 미리보기
      const previewUrl = URL.createObjectURL(projectData.mainImageFile)
      setImgSrc(previewUrl)
    } else if (existingMainImageUrl) {
      // 새 파일 없고 기존 URL 있으면 → 기존 URL 표시
      setImgSrc(existingMainImageUrl)
    } else {
      setImgSrc('')
    }
  }, [projectData.mainImageFile, existingMainImageUrl])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    onUpdate(name, value)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // (1) 기존 이미지가 있다면 → 삭제 처리
      if (existingMainImageId && onDeleteOldMainImage) {
        onDeleteOldMainImage(existingMainImageId)
      }

      // (2) 새 파일로 미리보기
      const previewUrl = URL.createObjectURL(file)
      setImgSrc(previewUrl)

      // (3) 상위 state에 저장
      onUpdate('mainImageFile', file)
    }
  }

  return (
    <div className="flex flex-col items-center bg-[url('/images/project/add/addProfile.png')] w-[19.1875rem] h-[46.6875rem] bg-cover ">
      <div className="flex mt-[3.07rem] w-full" />
      {projectType === 'study' && (
        <div
          onChange={handleInputChange}
          className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white justify-center text-center items-center text-[1.5rem] font-bold"
        >
          {projectData.name}
        </div>
      )}

      {projectType === 'project' && (
        <div className="relative w-[254px] h-[254px] min-w-[254px] min-h-[254px]flex justify-center items-center">
          {/* 업로드된 이미지 미리보기 */}
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="Uploaded Preview"
              width={254}
              height={254}
              className="rounded-2xl bg-contain min-w-[254px] min-h-[254px]"
            />
          ) : (
            <div className="flex flex-col w-full h-full rounded-md bg-lightgray text-gray items-center justify-center gap-4">
              <FaRegImage size={30} />
              <div className="flex flex-col items-center">
                <span className="text-gray">
                  눌러서 이미지를 업로드해주세요
                </span>
                <span className="text-gray">jpg, jpeg, png, gif 가능</span>
              </div>
            </div>
          )}

          {/* 이미지 업로드 버튼 */}
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
        </div>
      )}

      <div className="flex w-[15.875rem] justify-between items-center mt-[0.94rem] mb-[1.44rem]">
        <div>
          <p className="text-sm mb-1 text-gray">
            프로젝트 이름을 입력해주세요 <span className="text-primary">*</span>
          </p>
          <input
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="font-medium w-[15.8125rem] h-[1.875rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
            placeholder="프로젝트 이름"
          />
        </div>
      </div>

      <div className="w-[15.875rem] flex flex-col gap-2">
        <p className="text-sm mb-1 text-gray">관련 링크를 입력해주세요</p>

        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center gap-1">
            <div className="w-[4.41919rem] h-[1.5625rem] border border-primary rounded-[0.19rem] text-primary text-center">
              깃허브
            </div>
            <input
              name="githubLink"
              value={projectData.githubLink}
              onChange={handleInputChange}
              className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
              placeholder="레포지토리 주소"
            />
          </div>

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
        <p className="text-sm mb-1 text-gray">프로젝트 설명을 입력해주세요</p>
        {projectType === 'study' && (
          <textarea
            name="studyExplain"
            value={projectData.studyExplain}
            onChange={handleInputChange}
            maxLength={200}
            className="w-full p-2 border border-gray rounded-lg focus:outline-none resize-none
"
            rows={7}
          />
        )}
        {projectType === 'project' && (
          <textarea
            name="projectExplain"
            value={projectData.projectExplain}
            onChange={handleInputChange}
            maxLength={200}
            className="w-full p-2 border border-gray rounded-lg focus:outline-none resize-none
"
            rows={7}
          />
        )}
        <p className="text-right text-xs mt-1 whitespace-pre-wrap">
          {projectData?.projectExplain?.length}/200
        </p>
      </div>
    </div>
  )
}
