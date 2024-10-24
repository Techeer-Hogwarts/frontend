'use client'

import Image from 'next/image'
import win from '@/../../public/win.png'
import { useState } from 'react'
import SessionMenu from './SessionMenu'

export default function SessionPost() {
  const [showModal, setShowModal] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const handleBookmarkClick = () => {
    setIsBookmark(!isBookmark)
  }
  const handleLikeClick = () => {
    setIsLike(!isLike)
  }

  return (
    <div className="flex flex-col w-[379px] relative">
      <Image
        src={win}
        alt="testIMG"
        width={379}
        height={199}
        className="w-[379px] h-[199px]"
      />
      <div className="rounded-b-lg w-[379px] h-[100px] pt-2 bg-white shadow-[0px_5px_8px_#bfbfbf]">
        <div className="flex justify-between relative">
          <p className="text-base ml-5 mb-1">왜 웹소켓을 쓰는가</p>
          <Image
            src="/session/session-menu.svg"
            alt="seesionmenu"
            width={24}
            height={24}
            onClick={clickModal}
          />
          {showModal && <SessionMenu />}
        </div>
        <p className="text-sm text-black/30 ml-5">2024년 7월</p>
        <div className="flex ml-5 mt-3  justify-between">
          <div className="flex items-center">
            <div className="rounded-full w-4 h-4 bg-zinc-400 mr-1" />
            <span className="text-black font-semibold text-md">주영준</span>
          </div>
          <div className="flex mr-2">
            <button type="button" onClick={handleBookmarkClick}>
              {isBookmark ? (
                <Image
                  src="/bookmark-on.svg"
                  alt="bookmark-on"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/bookmark-off.svg"
                  alt="bookmark-off"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <button type="button" onClick={handleLikeClick}>
              {isLike ? (
                <Image
                  src="/like-on.svg"
                  alt="like-on"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/like-off.svg"
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