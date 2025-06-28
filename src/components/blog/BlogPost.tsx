/* eslint-disable @next/next/no-img-element */

'use client'

import Image from 'next/image'
import BlogMenu from './BlogMenu'
import BookmarkModal from '../common/BookmarkModal'
import { useEffect, useState } from 'react'
import { usePutBlogAPI } from '@/api/blog/blog'
import { BlogPostProps } from '@/types/BlogProps'
import { useLike } from '@/app/blog/_lib/useLike'

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
  onLikeUpdate,
}: BlogPostProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { postLike } = useLike()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isLike, setIsLike] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const clickLike = async () => {
    try {
      const newIsLike = !isLike
      const newLikeCount = newIsLike ? likeCount + 1 : likeCount - 1

      setIsLike(newIsLike)
      setLikeCount(newLikeCount)

      await postLike(Number(id), 'BLOG', newIsLike)
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
      setIsLike(likeList.some((bookmark) => String(bookmark.id) === String(id)))
    }
  }, [likeList, id])
  const putBlogMutation = usePutBlogAPI()

  const profile =
    category === 'TECHEER'
      ? { image: userImage, name: userName }
      : { image: authorImage, name: authorName }

  const formattedDate = new Date(date)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '')

  const handleClickUrl = () => {
    window.open(url, '_blank')
    putBlogMutation.mutate(Number(id))
  }

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
            alt="blog"
            className="w-full h-[155px] object-cover"
            onClick={handleClickUrl}
          />
        ) : (
          <button
            type="button"
            onClick={handleClickUrl}
            className="w-full flex items-center justify-center px-5 h-[155px] text-white bg-gradient-to-b from-[#FF8B20] to-[#FFC14F]"
          >
            {title}
          </button>
        )}
        <div className="py-2 bg-white">
          <div onClick={handleClickUrl}>
            <div className="flex relative justify-between pl-5 pr-2">
              <p className="truncate font-medium text-sm">{title}</p>
              <Image
                src="/images/session/session-menu.svg"
                alt="menu"
                width={20}
                height={20}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
              />
              {showMenu && (
                <div className="absolute top-[-5%] right-0 z-10">
                  <BlogMenu
                    id={id}
                    onDelete={onDelete}
                    setModalOpen={() => setModalOpen(true)}
                    setModalMessage={setModalMessage}
                    setShowMenu={setShowMenu}
                  />
                </div>
              )}
            </div>
            <p className="text-xs px-5 mb-1 text-black/30">{formattedDate}</p>
          </div>

          <div className="flex justify-between mt-3 pl-5 pr-2 pb-1">
            <div className="flex items-center">
              <img
                src={profile.image}
                alt="profile"
                className="w-5 h-5 rounded-full mr-2"
                onError={(e: any) => {
                  e.target.src = '/images/session/thumbnail.png'
                }}
              />

              <span className="text-xs font-semibold">{profile.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{likeCount}</span>
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
