'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { BiSolidPencil } from 'react-icons/bi'

export default function AddProfile() {
  const [projectName, setProjectName] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [notionUrl, setNotionUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imgSrc, setImgSrc] = useState<string | null>('') // 기본 이미지 설정
  const fileInput = useRef<HTMLInputElement>(null)



  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setImgSrc(e.target.result) // 이미지 미리보기 업데이트
      }
    }

    // 이미지를 서버로 전송하는 부분
    const formData = new FormData()
    formData.append('image', file)
    try {

    } catch (e) {
      console.error('이미지 업로드 오류:', e)
    }
  }

  return (
    <div className="flex flex-col items-center bg-[url('/images/project/add/addProfile.png')] w-[19.1875rem] h-[46.6875rem] bg-cover ">
      <div className="flex mt-[3.07rem] w-full" />
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
          <div className="w-[254px] h-[254px] bg-gray rounded-2xl flex items-center justify-center">
            <FaRegImage size={30} />
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

      <div className="flex w-[15.875rem] justify-between items-center mt-[0.94rem] mb-[1.44rem]">
        <div>
          <p className="text-sm mb-1 text-gray">프로젝트 이름을 입력해주세요</p>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
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
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
              placeholder="레포지토리 주소"
            />
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="w-[4.41919rem] h-[1.5625rem] border border-primary rounded-[0.19rem] text-primary text-center">
              노션
            </div>
            <input
              value={notionUrl}
              onChange={(e) => setNotionUrl(e.target.value)}
              className="w-[11.1875rem] h-[1.5625rem] p-2 border border-gray rounded-[0.25rem] focus:outline-none"
              placeholder="노션 주소"
            />
          </div>
        </div>
      </div>

      <div className="w-[15.875rem] mt-4">
        <p className="text-sm mb-1 text-gray">프로젝트 설명을 입력해주세요</p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          className="w-full p-2 border border-gray rounded-lg focus:outline-none"
          rows={7}
        />
        <p className="text-right text-xs mt-1">{description.length}/200</p>
      </div>
    </div>
  )
}
