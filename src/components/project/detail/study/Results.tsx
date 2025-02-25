import React from 'react'
import Image from 'next/image'

interface ResultBoxProps {
  url: string
}

const ResultBox = ({ url }: ResultBoxProps) => {

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={url}
        width={409}
        height={223}
        alt="Picture"
        className="max-w-[25.5625rem] max-h-[13.9375rem] rounded-md "
      />
    </div>
  )
}
export default function Results({ resultImages }) {

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
    </div>
  )
}
