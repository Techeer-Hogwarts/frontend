'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogMenu from './BlogMenu'
import { useLike } from '@/app/blog/_lib/useLike'

export interface BlogPostProps {
  readonly title: string
  readonly name: string
  readonly date: string
  id: string
  url: string
  likeCount: number
  image: string
  likeList: string[]
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
  likeList,
}: BlogPostProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const { fetchLikes, postLike } = useLike()
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const clickModal = () => {
    setShowModal(!showModal)
  }
  const fetchViews = async () => {
    try {
      const response = await fetch(`/api/v1/blogs/${id}`, {
        method: 'PUT',
        credentials: 'include',
      })
      console.log('response:', response)
      if (!response.ok) {
        throw new Error('블로그 조회수를 업데이트하는 데 실패했습니다.')
      }
    } catch (err) {
      console.error('블로그 조회수 업데이트 중 오류 발생:', err)
    }
  }
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
    } catch (err) {
      console.error(err)
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
    <div className="flex">
      <div className="flex flex-col w-[379px] relative ">
        <button onClick={handleClickUrl}>
          <img
            src={image}
            alt="testIMG"
            width={379}
            height={199}
            className="w-[379px] h-[199px] z-1"
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
              onClick={clickModal}
            />
            {showModal && (
              <div className="absolute top-[-5%] right-0 z-10">
                <BlogMenu id={id} onDelete={onDelete} />
              </div>
            )}
          </div>
          <p className="ml-5 text-sm text-black/30">{date}</p>
          <div className="flex justify-between mt-3 ml-5">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-1 rounded-full bg-zinc-400" />
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
