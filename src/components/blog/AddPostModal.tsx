'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ModalInputField from '../common/ModalInputField'

export default function AddPostModal() {
  const router = useRouter()
  const [blogLink, setBlogLink] = useState('')
  const handleBack = () => {
    router.back()
  }

  const handleInputChange = (e: any) => {
    setBlogLink(e.target.value)
  }

  const PostBlog = async () => {
    try {
      const blogUrl = encodeURIComponent(blogLink)
      const response = await fetch(`/api/v1/blogs?url=${blogUrl}`, {
        method: 'POST',
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('블로그 데이터를 업로드하는 데 실패했습니다.')
      }
      setBlogLink('')
      alert('블로그 글을 추가하였습니다.')
      window.location.href = '/blog'
    } catch (err) {
      console.error('블로그 데이터 업로드 중 오류 발생:', err)
    }
  }

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
            name="title"
            value={blogLink}
            handleInputChange={handleInputChange}
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
            onClick={PostBlog}
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
