'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaRegImage } from 'react-icons/fa6'

interface ImageOrIconProps {
  src?: string
  alt: string
  // (A) width, height를 추가
  width?: number | string
  height?: number | string
}

/**
 * src가 없거나, 이미지 로딩 중 에러가 발생하면 대체 아이콘을 표시합니다.
 */
function ImageOrIcon({ src, alt, width, height }: ImageOrIconProps) {
  const [imgError, setImgError] = useState(false)

  // (B) 부모가 width/height를 안 주면 기본값 (125px 등) 사용
  const containerWidth = width || 125
  const containerHeight = height || 125

  // (C) src가 없거나 에러 발생 시 아이콘 표시
  if (!src || imgError) {
    return (
      <div
        style={{ width: containerWidth, height: containerHeight }}
        className="flex items-center justify-center bg-lightgray text-gray rounded-lg"
      >
        <FaRegImage size={containerWidth/2} />
      </div>
    )
  }

  // (D) 정상 이미지
  return (
    <Image
      src={src}
      alt={alt}
      width={containerWidth}
      height={containerHeight}
      className="rounded-lg border bg-pink-300"
      onError={() => setImgError(true)}
    />
  )
}

export default ImageOrIcon
