'use client'

import Image from 'next/image'
import { useState } from 'react'
import BlogMenu from './BlogMenu'

export interface BlogPostProps {
  readonly title: string
  readonly name: string
  readonly date: string
  id: string
  url: string
  likeCount: number
  onDelete: (id: string) => void
}

export default function BlogPost({
  title,
  date,
  name,
  id,
  likeCount,
  url,
  onDelete,
}: BlogPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const handleLikeClick = () => {
    setIsLike(!isLike)
  }
  const handleClickUrl = () => {
    window.open(url, '_blank')
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-[379px] relative ">
        <Image
          src="/images/win.png"
          alt="testIMG"
          unoptimized
          width={379}
          height={199}
          className="w-[379px] h-[199px] z-1"
          onClick={handleClickUrl}
        />
        <div className="rounded-b-lg w-[379px] min-h-[100px] h-auto py-2  bg-white shadow-[0px_5px_8px_#bfbfbf]">
          <div className="flex justify-between relative">
            <p className="text-base mx-5 mb-1 truncate">{title}</p>
            <Image
              src="/images/session/session-menu.svg"
              alt="seesionmenu"
              width={24}
              height={24}
              className="absolute right-0 top-0"
              onClick={clickModal}
            />
            {showModal && (
              <div className="absolute top-[-5%] right-0 z-10">
                <BlogMenu id={id} onDelete={onDelete} />
              </div>
            )}
          </div>
          <p className="text-sm text-black/30 ml-5">{date}</p>
          <div className="flex ml-5 mt-3  justify-between">
            <div className="flex items-center">
              <div className="rounded-full w-4 h-4 bg-zinc-400 mr-1" />
              <span className="text-black font-semibold text-md">{name}</span>
            </div>
            <div className="flex mr-2">
              <span className="mr-1">{likeCount}</span>
              <button type="button" onClick={handleLikeClick}>
                {isLike ? (
                  <Image
                    src="/images/like-on.svg"
                    alt="like-on"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/images/like-off.svg"
                    alt="like-off"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
