'use client'

import React from 'react'
import Image from 'next/image'

interface AddResumeProps {
  setModal: (value: boolean) => void
}

export default function AddResume({ setModal }: AddResumeProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] h-[324px] flex flex-col items-center items-cente bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-7 mb-1 font-semibold">
            이력서 추가
          </p>
          <Image src="/folder.png" alt="folder" width={100} height={100} />
        </div>
        <div className="relative mx-5 mt-4">
          <p>이력서를 첨주해주세요</p>
          <div className="rounded-full w-1 h-1 absolute top-0 left-36 bg-primary" />
          <div className="flex w-[414px] items-center justify-between mt-2">
            <input
              type="text"
              placeholder="PDF 파일만 업로드 가능합니다"
              className="w-[320px] rounded-sm pl-2 text-sm outline-none h-[34px] border border-lightgray"
            />
            <button
              type="button"
              className="flex w-[80px] rounded-sm text-sm h-[34px] justify-center items-center border border-lightgray text-gray"
            >
              + 첨부
            </button>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            onClick={() => {
              setModal(false)
            }}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray "
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
