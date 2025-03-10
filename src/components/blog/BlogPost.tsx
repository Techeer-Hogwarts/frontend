/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogMenu from './BlogMenu'
import { useLike } from '@/app/blog/_lib/useLike'
import BookmarkModal from '../common/BookmarkModal'

export interface BlogPostProps {
  title: string
  userName: string
  userImage: string
  date: string
  id: string
  url: string
  likeCount: number
  image: string
  category: string
  likeList: string[]
  authorName: string
  authorImage: string
  onDelete: (id: string) => void
}

export default function BlogPost({
  title,
  date,
  userName,
  userImage,
  id,
  category,
  likeCount: initialLikeCount,
  url,
  image,
  onDelete,
  authorName,
  authorImage,
  likeList,
}: BlogPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const { postLike } = useLike()
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isLikeProcessing, setIsLikeProcessing] = useState(false) // 여러 번 클릭 방지를 위한 상태 추가
  const profile =
    category === 'TECHEER'
      ? { image: userImage, name: userName }
      : { image: authorImage, name: authorName }

  const clickModal = () => {
    setShowModal(!showModal)
  }

  const fetchViews = async () => {
    try {
      const response = await fetch(`/api/v1/blogs/${id}`, {
        method: 'PUT',
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('블로그 조회수를 업데이트하는 데 실패했습니다.')
      }
    } catch (err) {}
  }

  const formattedDate = new Date(date)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '')

  const clickLike = async () => {
    // 처리 중일 때 추가 클릭 방지
    if (isLikeProcessing) return

    setIsLikeProcessing(true)

    try {
      // UI 즉시 업데이트
      const newLikeState = !isLike
      setIsLike(newLikeState)
      // 새로운 상태에 따라 좋아요 수 업데이트
      setLikeCount((prev) => (newLikeState ? prev + 1 : Math.max(0, prev - 1)))
      await postLike(Number(id), 'BLOG', newLikeState)
    } catch (err) {
      setIsLike(!isLike)
      setLikeCount((prev) => (isLike ? prev + 1 : Math.max(0, prev - 1)))
      console.error('좋아요 상태 업데이트 실패:', err)
    } finally {
      setIsLikeProcessing(false)
    }
  }

  const handleClickUrl = () => {
    window.open(url, '_blank')
    fetchViews()
  }

  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(likeList.some((bookmark: any) => bookmark.id === id))
    }
  }, [likeList, id])

  return (
    <div>
      <BookmarkModal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
      <div className="flex flex-col w-full relative rounded-b-lg shadow-[0px_5px_8px_#e5e5e5] overflow-hidden transition-transform transform hover:-translate-y-2 cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="testIMG"
            className="w-full h-[155px] z-1 object-cover"
            onClick={handleClickUrl}
          />
        ) : (
          <button
            onClick={handleClickUrl}
            className="w-full flex items-center justify-center px-5 h-[155px] text-white bg-gradient-to-b from-[#FF8B20] to-[#FFC14F]"
          >
            {title}
          </button>
        )}
        <div className="w-full min-h-[100px] h-auto py-2 bg-white">
          <div className="relative flex justify-between">
            <p className="w-full px-5 mr-1 mb-1 text-base truncate whitespace-nowrap overflow-hidden">
              {title}
            </p>
            <Image
              src="/images/session/session-menu.svg"
              alt="seesionmenu"
              width={24}
              height={24}
              className="absolute top-0 right-0"
              onClick={clickModal}
            />
            {showModal && (
              <div className="absolute top-[-5%] right-0 z-10">
                <BlogMenu
                  id={id}
                  onDelete={onDelete}
                  setModalOpen={setModalOpen}
                  setModalMessage={setModalMessage}
                />
              </div>
            )}
          </div>
          <p className="ml-5 text-sm text-black/30">{formattedDate}</p>
          <div className="flex justify-between mt-3 ml-5">
            <div className="flex items-center">
              <img
                src={profile.image}
                alt="img"
                className="w-5 h-5 mr-1 rounded-full"
                onError={(e: any) => {
                  e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
                }}
              />
              <span className="font-semibold text-black text-md">
                {profile.name}
              </span>
            </div>

            <div className="flex mr-2">
              <span className="mr-1">{likeCount}</span>
              <button
                type="button"
                onClick={clickLike}
                disabled={isLikeProcessing}
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
