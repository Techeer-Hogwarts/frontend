'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SessionMenu from './SessionMenu'
import { useRouter } from 'next/navigation'
import { useLike } from '@/app/blog/_lib/useLike'
import BookmarkModal from '../common/BookmarkModal'

export interface SessionPostProps {
  id: string
  thumbnail: string
  readonly likeCount: number
  readonly title: string
  readonly date: string
  readonly presenter: string
  fileUrl: string
  likeList: string[]
  userId: string
  showMessage?: () => void
  onLikeUpdate?: (id: string, newLikeCount: number) => void
}

export default function SessionPost({
  title,
  date,
  presenter,
  id,
  userId,
  likeCount: initialLikeCount,
  thumbnail,
  fileUrl,
  showMessage,
  likeList,
  onLikeUpdate,
}: SessionPostProps) {
  const router = useRouter()
  const { postLike } = useLike()
  const [isLike, setIsLike] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isError, setIsError] = useState(false)
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
    }
  }
  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(likeList.some((bookmark: any) => bookmark.id === id))
    }
  }, [likeList, id])
  return (
    <div className={`relative ${showModal ? 'z-50' : 'z-0'}`}>
      <BookmarkModal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />

      <div className="flex transition-transform transform hover:-translate-y-2 cursor-pointer relative z-0 ">
        {showModal && (
          <div className="absolute top-40 right-1 z-50 mt-2">
            <SessionMenu
              id={id}
              userId={userId}
              fileUrl={fileUrl}
              setShowModal={setShowModal}
              showMessage={showMessage}
              setModalOpen={setModalOpen}
              setModalMessage={setModalMessage}
            />
          </div>
        )}
        <div className="flex flex-col w-full relativ rounded-b-lg shadow-[0px_5px_8px_#e5e5e5] overflow-hidden">
          {!isError ? (
            <Image
              src={thumbnail}
              alt="img"
              unoptimized
              width={379}
              height={199}
              className="w-full h-[155px] z-1 object-cover"
              onError={() => setIsError(true)}
              onClick={() => {
                router.push(`/session/video/${id}`)
              }}
            />
          ) : (
            <button
              onClick={() => {
                router.push(`/session/video/${id}`)
              }}
              className="w-full flex items-center justify-center px-5 h-[155px] truncate text-white bg-gradient-to-b from-[#FF8B20] to-[#FFC14F]"
            >
              {title}
            </button>
          )}

          <div className="w-full min-h-[100px] h-auto py-2 bg-white">
            <div className="relative flex justify-between z-0">
              <p className="w-full px-5 mr-1 mb-1 text-base truncate whitespace-nowrap overflow-hidden">
                {title}
              </p>
              <Image
                src="/images/session/session-menu.svg"
                alt="seesionmenu"
                width={24}
                height={24}
                className="absolute top-0 right-0 z-10"
                onClick={() => {
                  setShowModal(!showModal)
                }}
              />
            </div>
            <p className="ml-5 text-sm text-black/30">{date}</p>
            <div className="flex justify-between mt-3 ml-5">
              <div className="flex items-center">
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
    </div>
  )
}
