'use client'

import React from 'react'
import Image from 'next/image'

interface ResultBoxProps {
  url: string
}

const ResultBox = ({ url }: ResultBoxProps) => {
<<<<<<< HEAD
=======
  console.log(url)

>>>>>>> main
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={url}
        width={409}
        height={223}
        alt="Picture"
<<<<<<< HEAD
        className="rounded-md bg-lightpink object-cover w-[409px] h-[223px]"
=======
        className="max-w-[25.5625rem] max-h-[13.9375rem] rounded-md bg-lightpink"
>>>>>>> main
      />
    </div>
  )
}
export default function Results({ resultImages }) {
  console.log(resultImages)

<<<<<<< HEAD
interface ResultsProps {
  // 문자열 배열로 된 이미지 URL들
  resultImages: string[]
}

export default function Results({ resultImages }: ResultsProps) {
  // resultImages가 없거나 길이가 0이면 표시하지 않음
  if (!resultImages || resultImages.length === 0) {
    return null
  }

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">결과물</div>
      <div className="grid grid-cols-2 gap-6">
        {resultImages.map((image) => (
          <ResultBox key={image} url={image} />
        ))}
      </div>
=======
  return (
    <div>
      {resultImages?.length > 0 && (
        <>
          <div className="text-[1.125rem] font-[600] mb-3">결과물</div>
          <div className="grid grid-cols-2 gap-6">
            {resultImages.map((image) => (
              <ResultBox key={image.id} url={image.imageUrl} />
            ))}
          </div>
        </>
      )}
>>>>>>> main
    </div>
  )
}
