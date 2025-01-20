import React from 'react'
import Image from 'next/image'

interface ResultBoxProps {
  text: string
  url: string
}

const ResultBox = ({ text, url }: ResultBoxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={url}
        width={409}
        height={223}
        alt="Picture"
        className=" rounded-md bg-lightpink"
      />
      <div className="w-[25.5625rem] max-h-[3.625rem] p-1 border-lightgray border rounded-md">
        {text}
      </div>
    </div>
  )
}

export default function Results(resultImages) {
  return (
    <div>
      {resultImages.length > 0 && (
        <>
          <div className="text-[1.125rem] font-[600] mb-3">결과물</div>
          <div className="grid grid-cols-2 gap-6">
            {resultImages.map((image) => (
              <ResultBox key={image} text="회원가입 페이지" url={image} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
