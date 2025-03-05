'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogMenu from './BlogMenu'
import { useLike } from '@/app/blog/_lib/useLike'
import BookmarkModal from '../common/BookmarkModal'

export interface BlogPostProps {
  readonly title: string
  readonly name: string
  readonly date: string
  id: string
  url: string
  likeCount: number
  image: string
  likeList: string[]
  authorImage: string
  onDelete: (id: string) => void
}

export default function BlogPost({
  title,
  date,
  name,
  id,
  likeCount: initialLikeCount,
  url,
  image,
  onDelete,
  authorImage,
  likeList,
}: BlogPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const { fetchLikes, postLike } = useLike()
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const fetchViews = async () => {
    try {
      const response = await fetch(`/api/v1/blogs/${id}`, {
        method: 'PUT',
        credentials: 'include',
      })
      // console.log('response:', response)
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
    setIsLike(!isLike)
    try {
      const data = await fetchLikes('BLOG', 0, 20)
      const isAlreadyLiked = data.some((bookmark: any) => bookmark.id === id)

      if (isAlreadyLiked) {
        postLike(Number(id), 'BLOG', false)
        setIsLike(false)
        setLikeCount((prev) => Math.max(0, prev - 1))
      } else {
        postLike(Number(id), 'BLOG', true)
        setIsLike(true)
        setLikeCount((prev) => prev + 1)
      }
    } catch (err) {}
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
            // onError={(e: any) => {
            //   e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
            // }}
          />
        ) : (
          <div className="flex w-full h-[155px] z-1 bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] text-white justify-center text-center items-center text-[1.2rem] font-bold">
            {title}
          </div>
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
                src={authorImage}
                alt="img"
                className="w-5 h-5 mr-1 rounded-full"
                onError={(e: any) => {
                  e.target.src = '/images/session/thumbnail.png' // 대체 이미지 경로
                }}
              />
              <span className="font-semibold text-black text-md">{name}</span>
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
