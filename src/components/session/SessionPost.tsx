'use client'

import Image from 'next/image'
import { useState } from 'react'
import SessionMenu from './SessionMenu'
import ReactPlayer from 'react-player'

export interface SessionPostProps {
  id: string
  onDelete: (id: string) => void
  thumbnail: string
  readonly likeCount: number
  readonly title: string
  readonly date: string
  readonly presenter: string
  videoUrl: string
  fileUrl: string
}

export default function SessionPost({
  title,
  date,
  presenter,
  id,
  likeCount,
  onDelete,
  thumbnail,
  videoUrl,
  fileUrl,
}: SessionPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const handleLikeClick = () => {
    setIsLike(!isLike)
  }
  const showVideo = () => {
    setIsVideo(!isVideo)
  }

  return (
    <div className="flex ">
      <div className="flex flex-col w-[379px] relative transition-transform transform hover:-translate-y-2">
        <Image
          src={thumbnail}
          alt="testIMG"
          unoptimized
          width={379}
          height={199}
          className="w-[379px] h-[199px] z-1"
          onClick={() => {
            showVideo()
            console.log('hihi', videoUrl)
          }}
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
                <SessionMenu id={id} onDelete={onDelete} fileUrl={fileUrl} />
              </div>
            )}
          </div>
          <p className="text-sm text-black/30 ml-5">{date}</p>
          <div className="flex ml-5 mt-3  justify-between">
            <div className="flex items-center">
              <div className="rounded-full w-4 h-4 bg-zinc-400 mr-1" />
              <span className="text-black font-semibold text-md">
                {presenter}
              </span>
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
      {isVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" rounded-lg p-4 relative w-1/2">
            <button
              onClick={showVideo}
              className="absolute top-6 right-6 z-40 text-gray-500 w-7 h-7 flex justify-center items-center text-white rounded-full bg-black/60 hover:text-white/70"
            >
              ✕
            </button>
            <div className="video-wrapper">
              <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
