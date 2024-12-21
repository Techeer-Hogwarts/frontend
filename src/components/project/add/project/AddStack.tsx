'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

export default function AddStack() {
  // 더미값
  const [backendStack, setBackendStack] = useState([
    'Go Lang',
    'PostgreSQL',
    'Nest.JS',
    'Python',
  ])
  const [frontendStack, setFrontendStack] = useState([
    'Zustand',
    'Next.js',
    'TS',
  ])
  const [devopsStack, setDevopsStack] = useState([
    'Jenkins CI',
    'GCP',
    'Terraform',
    'Github Actions',
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-[1.22rem]">
        <div className=" flex items-center justify-center text-center font-medium text-gray">
          기술 스택을 입력해주세요<span className="text-primary">*</span>
        </div>
        <input
          className="w-[13.75381rem] h-[2rem] rounded-[0.19rem] border border-gray px-2 py-1"
          type="text"
        />
      </div>
      <div className="flex flex-col w-[52.5rem] border border-gray p-4 rounded-2xl gap-4 ">
        <StackCategory
          title="Backend"
          stack={backendStack}
          setStack={setBackendStack}
        />
        <div className="border-lightgray border-t"></div>
        <StackCategory
          title="Frontend"
          stack={frontendStack}
          setStack={setFrontendStack}
        />
        <div className="border-lightgray border-t"></div>

        <StackCategory
          title="DevOps"
          stack={devopsStack}
          setStack={setDevopsStack}
        />
      </div>
    </div>
  )
}

// 스택 삭제 함수
const handleDelete = (
  stack: string[],
  setStack: React.Dispatch<React.SetStateAction<string[]>>,
  tech: string,
) => {
  setStack(stack.filter((item) => item !== tech))
}

// 스택 박스
interface BoxProps {
  text: string
  onDelete: () => void
}

const Box = ({ text, onDelete }: BoxProps) => {
  return (
    <div className="flex items-center justify-center bg-lightprimary px-4 rounded-md h-[1.6rem] text-pink text-[0.9375rem] relative">
      {text}
      {/* X 버튼 */}
      <button
        onClick={onDelete}
        className="w-[0.7rem] h-[0.7rem]  absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
      >
        <IoClose />
      </button>
    </div>
  )
}

// 포지션 카테고리
interface StackCategoryProps {
  title: string
  stack: string[]
  setStack: React.Dispatch<React.SetStateAction<string[]>>
}

const StackCategory = ({ title, stack, setStack }: StackCategoryProps) => {
  return (
    <div className="flex gap-[1rem]">
      <div className="text-darkPrimary w-[4.76319rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, idx) => (
          <Box
            key={idx}
            text={tech}
            onDelete={() => handleDelete(stack, setStack, tech)} // 삭제 함수 호출
          />
        ))}
      </div>
    </div>
  )
}
