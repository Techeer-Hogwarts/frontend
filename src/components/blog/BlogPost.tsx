'use client'

import Image from 'next/image'
import BookmarkModal from '../common/BookmarkModal'
import useBookmarkModal from '@/hooks/blog/useBookmarkModal'
import { useForm } from 'react-hook-form'
import { usePutBlogAPI } from '@/api/blog/blog'
import { usePostLikeAPI } from '@/api/likes/likes'

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
  const { register, setValue, watch } = useForm({
    defaultValues: {
      isLike: likeList.includes(id),
      likeCount: initialLikeCount,
    },
  })

  const isLike = watch('isLike')
  const likeCount = watch('likeCount')

  const postLikeMutation = usePostLikeAPI()
  const putBlogMutation = usePutBlogAPI()
  const { isOpen, message, openModal, closeModal } = useBookmarkModal()

  const profile =
    category === 'TECHEER'
      ? { image: userImage, name: userName }
      : { image: authorImage, name: authorName }

  const handleClickUrl = () => {
    window.open(url, '_blank')
    putBlogMutation.mutate(Number(id))
  }

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const clickLike = async () => {
    try {
      const newLikeState = !isLike
      setValue('isLike', newLikeState)
      setValue(
        'likeCount',
        newLikeState ? likeCount + 1 : Math.max(0, likeCount - 1),
      )
      await postLikeMutation.mutateAsync({
        contentId: Number(id),
        category: 'BLOG',
        likeStatus: newLikeState,
      })
    } catch (err) {
      console.error('좋아요 상태 업데이트 실패:', err)
    }
  }

  return (
    <div>
      <BookmarkModal isOpen={isOpen} message={message} onClose={closeModal} />
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
        <div className="p-3 bg-white">
          <div className="flex justify-between">
            <p className="truncate text-base">{title}</p>
            <Image
              src="/images/session/session-menu.svg"
              alt="menu"
              width={24}
              height={24}
              onClick={() => openModal('옵션을 선택하세요')}
            />
          </div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <img
                src={profile.image}
                alt="profile"
                className="w-6 h-6 rounded-full"
                onError={(e: any) =>
                  (e.target.src = '/images/session/thumbnail.png')
                }
              />
              <span className="ml-2 text-sm font-semibold">{profile.name}</span>
            </div>
            <button onClick={clickLike} className="flex items-center space-x-1">
              <span>{likeCount}</span>
              <Image
                src={isLike ? '/images/like-on.svg' : '/images/like-off.svg'}
                alt="like"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
