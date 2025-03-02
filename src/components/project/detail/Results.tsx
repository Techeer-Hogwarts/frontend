'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ResultsProps {
  // 문자열 배열로 된 이미지 URL들
  resultImages: string[]
}

export default function Results({ resultImages }: ResultsProps) {
  // 큰 이미지를 표시할 때 사용할 상태 (없으면 null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 이미지 클릭 시 모달에 띄울 URL을 설정
  const handleImageClick = (url: string) => {
    setSelectedImage(url)
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  // resultImages가 없거나 길이가 0이면 표시하지 않음
  if (!resultImages || resultImages.length === 0) {
    return null
  }

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">결과물</div>
      <div className="grid grid-cols-2 gap-6">
        {resultImages.map((imageUrl) => (
          <div
            key={imageUrl}
            onClick={() => handleImageClick(imageUrl)}
            className="cursor-pointer"
          >
            <Image
              src={imageUrl}
              width={409}
              height={223}
              alt="Preview"
              className="rounded-md object-cover w-[409px] h-[223px]"
            />
          </div>
        ))}
      </div>

      {/* 이미지 모달 (selectedImage가 있을 때만 표시) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          {/* 클릭 이벤트 전파 중단으로, 이미지 클릭 시 닫히지 않게 함 */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Full-size"
              width={800}
              height={600}
              className="rounded-md object-cover"
            />
            {/* 닫기 버튼 (선택 사항) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
