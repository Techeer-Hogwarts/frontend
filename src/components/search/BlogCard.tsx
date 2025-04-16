'use client'

import Image from 'next/image'
import { useState } from 'react'
import BlogMenu from '../blog/BlogMenu'

interface BlogPostProps {
  blog: {
    id: string
    title: string
    url: string
    date: string
    userID: string
    userName: string
    userProfileImage: string
    thumbnail: string
    stack: string[]
  }
  //   readonly title: string
  //   readonly name: string
  //   readonly date: string
  //   id: string
  //   url: string
  //   likeCount: number
  //   image: string
  //   onDelete: (id: string) => void
}

export default function BlogPost({ blog }: BlogPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const handleLikeClick = () => {
    setIsLike(!isLike)
  }
  const handleClickUrl = () => {
    window.open(blog.url, '_blank')
  }

  const formattedDate = new Date(blog.date)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '')

  // 블로그 타이틀 설정
  const blogTitle = blog.title.split('-').slice(-1).join(' ')
  const truncatedTitle =
    blogTitle.length > 16 ? blogTitle.slice(0, 16) + '...' : blogTitle

  return (
    <div className="flex flex-wrap gap-12">
      <div className="flex flex-col w-[300px] relative ">
        {blog.thumbnail ? (
          <img
            src={blog.thumbnail}
            alt="thumbnail"
            width={379}
            height={199}
            className="w-full h-[155px] z-1 object-cover"
            onClick={handleClickUrl}
          />
        ) : (
          <button
            onClick={handleClickUrl}
            className="w-full flex items-center justify-center px-5 h-[155px] text-white bg-gradient-to-b from-[#FF8B20] to-[#FFC14F]"
          >
            {blog.title}
          </button>
        )}
        <div className="rounded-b-lg w-[300px] min-h-[100px] h-auto py-2  bg-white shadow-[0px_5px_8px_#bfbfbf]">
          <div className="flex justify-between relative">
            <p className="text-base mx-5 mb-1 truncate">{truncatedTitle}</p>
          </div>
          <p className="text-sm text-black/30 ml-5">{formattedDate}</p>
          <div className="flex ml-5 mt-3  justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="rounded-full w-4 h-4 bg-zinc-400 mr-1" /> */}
              <Image
                className="mr-1 rouded-full"
                src={blog.userProfileImage}
                width={16}
                height={16}
                alt="profileImg"
              />
              <span className="text-black font-semibold text-md">
                {blog.userName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
