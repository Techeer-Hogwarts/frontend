'use client'

import Image from 'next/image'
import { useState } from 'react'
import SessionMenu from './SessionMenu'
import { useRouter } from 'next/navigation'

export interface SessionPostProps {
  id: string
  thumbnail: string
  readonly likeCount: number
  readonly title: string
  readonly date: string
  readonly presenter: string
  fileUrl: string
  showMessage: () => void
}

export default function SessionPost({
  title,
  date,
  presenter,
  id,
  likeCount,
  thumbnail,
  fileUrl,
  showMessage,
}: SessionPostProps) {
  const router = useRouter()
  const [isLike, setIsLike] = useState(false)
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex transition-transform transform hover:-translate-y-2">
      <div className="flex flex-col w-[379px] relative">
        <Image
          src={thumbnail}
          alt="testIMG"
          unoptimized
          width={379}
          height={199}
          className="w-[379px] h-[199px] z-1"
          onClick={() => {
            router.push(`/session/video/${id}`)
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
              onClick={() => {
                setShowModal(!showModal)
              }}
            />
            {showModal && (
              <div className="absolute top-[-5%] right-0 z-10">
                <SessionMenu
                  id={id}
                  fileUrl={fileUrl}
                  showMessage={showMessage}
                />
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
              <button
                type="button"
                onClick={() => {
                  setIsLike(!isLike)
                }}
              >
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
