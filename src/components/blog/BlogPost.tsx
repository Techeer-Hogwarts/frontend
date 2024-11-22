'use client'

import Image from 'next/image'
import { useState } from 'react'

export interface BlogPostProps {
  readonly title: string
  readonly name: string
  readonly date: string
}

export default function BlogPost({ title, date, name }: BlogPostProps) {
  const [isBookmark, setIsBookmark] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const handleBookmarkClick = () => {
    setIsBookmark(!isBookmark)
  }
  const handleLikeClick = () => {
    setIsLike(!isLike)
  }

  return (
    <div className="flex flex-col w-[379px] relative">
      <Image
        src="/images/win.png"
        alt="testIMG"
        width={379}
        height={199}
        className="w-[379px] h-[199px]"
      />
      <div className="rounded-b-lg w-[379px] min-h-[100px] py-2 bg-white shadow-[0px_5px_8px_#bfbfbf]">
        <div className="flex justify-between relative">
          <p className="text-base mx-5 mb-1 truncate">{title}</p>
        </div>
        <p className="text-sm text-black/30 ml-5">{date}</p>
        <div className="flex ml-5 mt-3  justify-between">
          <div className="flex items-center">
            <div className="rounded-full w-4 h-4 bg-zinc-400 mr-1" />
            <span className="text-black font-semibold text-md">{name}</span>
          </div>
          <div className="flex mr-2">
            <button type="button" onClick={handleBookmarkClick}>
              {isBookmark ? (
                <Image
                  src="/images/bookmark-on.svg"
                  alt="bookmark-on"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/images/bookmark-off.svg"
                  alt="bookmark-off"
                  width={24}
                  height={24}
                />
              )}
            </button>
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
  )
}
