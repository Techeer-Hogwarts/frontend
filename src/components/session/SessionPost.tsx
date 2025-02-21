'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SessionMenu from './SessionMenu'
import { useRouter } from 'next/navigation'
import { useLike } from '@/app/blog/_lib/useLike'

export interface SessionPostProps {
  id: string
  thumbnail: string
  readonly likeCount: number
  readonly title: string
  readonly date: string
  readonly presenter: string
  fileUrl: string
  likeList: string[]
  showMessage: () => void
  onLikeUpdate?: (id: string, newLikeCount: number) => void
  userImage: string
}

export default function SessionPost({
  title,
  date,
  presenter,
  id,
  likeCount: initialLikeCount,
  thumbnail,
  fileUrl,
  showMessage,
  likeList,
  onLikeUpdate,
  userImage,
}: SessionPostProps) {
  const router = useRouter()
  const { postLike } = useLike()
  const [isLike, setIsLike] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const clickLike = async () => {
    try {
      const newIsLike = !isLike
      const newLikeCount = newIsLike ? likeCount + 1 : likeCount - 1
      // 낙관적 업데이트
      setIsLike(newIsLike)
      setLikeCount(newLikeCount)
      await postLike(Number(id), 'SESSION', newIsLike)
      if (typeof onLikeUpdate === 'function') {
        onLikeUpdate(id, newLikeCount)
      }
    } catch (err) {
      setIsLike(!isLike)
      setLikeCount(isLike ? likeCount : likeCount - 1)
      console.error(err)
    }
  }
  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(likeList.some((bookmark: any) => bookmark.id === id))
    }
  }, [likeList, id])
  return (
    <div className="flex transition-transform transform hover:-translate-y-2">
      <div className="flex flex-col w-[379px] relative">
        <button
          onClick={() => {
            router.push(`/session/video/${id}`)
          }}
        >
          <Image
            src={thumbnail}
            alt="testIMG"
            unoptimized
            width={379}
            height={199}
            className="w-[379px] h-[199px] z-1"
            onError={(e: any) => {
              e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
            }}
          />
        </button>
        <div className="rounded-b-lg w-[379px] min-h-[100px] h-auto py-2  bg-white shadow-[0px_5px_8px_#bfbfbf]">
          <div className="relative flex justify-between">
            <p className="mx-5 mb-1 text-base truncate">{title}</p>
            <Image
              src="/images/session/session-menu.svg"
              alt="seesionmenu"
              width={24}
              height={24}
              className="absolute top-0 right-0"
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
          <p className="ml-5 text-sm text-black/30">{date}</p>
          <div className="flex justify-between mt-3 ml-5">
            <div className="flex items-center">
              <img
                src={userImage}
                alt="img"
                className="w-5 h-5 mr-1 rounded-full"
                onError={(e: any) => {
                  e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
                }}
              />
              <span className="font-semibold text-black text-md">
                {presenter}
              </span>
            </div>
            <div className="flex mr-2">
              <span className="mr-1">{likeCount}</span>
              <button type="button" onClick={clickLike}>
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
