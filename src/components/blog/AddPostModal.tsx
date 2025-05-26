'use client'

import Image from 'next/image'
import ModalInputField from '../common/ModalInputField'
import { usePostBlog } from '@/hooks/blog/usePostBlog'

export default function AddPostModal() {
  const { blogLink, handleInputChange, handlePostBlog, handleBack } =
    usePostBlog()

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] h-[324px] flex flex-col items-center bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-7 mb-1 font-semibold">
            글 추가
          </p>
          <Image
            src="/images/blog/folder.png"
            alt="folder"
            width={100}
            height={100}
          />
        </div>
        <div className="relative mx-9 mt-4">
          <ModalInputField
            title="블로그 링크를 입력해주세요"
            placeholder="www.TecheerBlog.com"
            essential="*"
            value={blogLink}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handlePostBlog}
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
