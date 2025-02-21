'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import StackDropdown from './StackDropdown'
import { IoClose } from 'react-icons/io5'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { getStacks } from '@/api/project/project/project'

interface BoxProps {
  text: string
  isMain: boolean
  onDelete: () => void
}
function Box({ text, isMain, onDelete }: BoxProps) {
  return (
    <div
      className={`flex items-center justify-center px-4 rounded-md h-[1.6rem] text-[0.9375rem] relative text-pink
        ${isMain ? 'bg-primary/60 ' : 'bg-lightprimary'}
      `}
    >
      {text}
      <button
        onClick={onDelete}
        className="w-[0.7rem] h-[0.7rem] absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
      >
        <IoClose />
      </button>
    </div>
  )
}

interface StackCategoryProps {
  title: string
  stack: string[]
  onDeleteStack: (tech: string) => void
}
function StackCategory({ title, stack, onDeleteStack }: StackCategoryProps) {
  return (
    <div className="flex gap-[1rem]">
      <div className="text-darkPrimary w-[4.76319rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, idx) => (
          <Box
            key={tech}
            text={tech}
            isMain={idx === 0} // 첫 번째 스택이면 메인
            onDelete={() => onDeleteStack(tech)}
          />
        ))}
      </div>
    </div>
  )
}

interface AddStackProps {
  onUpdateStacks: (teamStacks: { stack: string; isMain: boolean }[]) => void
}

export default function AddStack({ onUpdateStacks }: AddStackProps) {
  const [backendStack, setBackendStack] = useState<string[]>([])
  const [frontendStack, setFrontendStack] = useState<string[]>([])
  const [devopsStack, setDevopsStack] = useState<string[]>([])
  const [otherStack, setOtherStack] = useState<string[]>([])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [categories, setCategories] = useState<
    { name: string; options: string[] }[]
  >([])

  const {
    data: allStacks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getStacks'],
    queryFn: getStacks,
  })

  useEffect(() => {
    if (!allStacks) return
    const catMap: Record<string, string[]> = {
      FRONTEND: [],
      BACKEND: [],
      DEVOPS: [],
      OTHER: [],
    }
    allStacks.forEach((item: { name: string; category: string }) => {
      if (catMap[item.category]) {
        catMap[item.category].push(item.name)
      }
    })

    const result = [
      { name: 'FRONTEND', options: catMap.FRONTEND },
      { name: 'BACKEND', options: catMap.BACKEND },
      { name: 'DEVOPS', options: catMap.DEVOPS },
      { name: 'OTHER', options: catMap.OTHER },
    ]
    setCategories(result)
  }, [allStacks])

  // 스택->카테고리 매핑
  const stackCategoryMap: Record<string, string> = {}
  if (allStacks) {
    allStacks.forEach((s: { name: string; category: string }) => {
      stackCategoryMap[s.name] = s.category
    })
  }

  const handleSelectFromDropdown = (newSelected: string[]) => {
    const added = newSelected.filter((item) => !selectedOptions.includes(item))
    const removed = selectedOptions.filter(
      (item) => !newSelected.includes(item),
    )

    added.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND') setFrontendStack((prev) => [...prev, name])
      else if (cat === 'BACKEND') setBackendStack((prev) => [...prev, name])
      else if (cat === 'DEVOPS') setDevopsStack((prev) => [...prev, name])
      else if (cat === 'OTHER') setOtherStack((prev) => [...prev, name])
    })

    removed.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND')
        setFrontendStack((prev) => prev.filter((x) => x !== name))
      else if (cat === 'BACKEND')
        setBackendStack((prev) => prev.filter((x) => x !== name))
      else if (cat === 'DEVOPS')
        setDevopsStack((prev) => prev.filter((x) => x !== name))
      else if (cat === 'OTHER')
        setOtherStack((prev) => prev.filter((x) => x !== name))
    })

    setSelectedOptions(newSelected)
  }

  const handleRemoveStack = (category: string, stackName: string) => {
    if (category === 'Backend') {
      setBackendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'Frontend') {
      setFrontendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'DevOps') {
      setDevopsStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'Other') {
      setOtherStack((prev) => prev.filter((item) => item !== stackName))
    }
    setSelectedOptions((prev) => prev.filter((item) => item !== stackName))
  }

  // teamStacks 생성
  function buildTeamStacks() {
    const result: { stack: string; isMain: boolean }[] = []
    // 각 카테고리 첫 번째 요소만 isMain
    frontendStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    backendStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    devopsStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    otherStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    return result
  }

  useEffect(() => {
    const newTeamStacks = buildTeamStacks()
    onUpdateStacks(newTeamStacks)
  }, [frontendStack, backendStack, devopsStack, otherStack])

  return (
    <div>
      <div className="flex items-center mb-2 gap-2 justify-between">
        <div className="flex items-center font-medium text-gray">
          기술 스택을 입력해주세요<span className="text-primary">*</span>
        </div>
        <StackDropdown
          title="스택 선택"
          categories={categories}
          selectedOptions={selectedOptions}
          setSelectedOptions={handleSelectFromDropdown}
        />
      </div>
      <div className="flex justify-start gap-1 text-xs items-center text-gray mb-1">
        <RxQuestionMarkCircled />각 포지션 첫 번째 스택이 메인 스택으로
        지정됩니다.
      </div>

      <div className="flex flex-col w-[52.5rem] border border-gray p-4 rounded-2xl gap-4">
        <StackCategory
          title="Frontend"
          stack={frontendStack}
          onDeleteStack={(tech) => handleRemoveStack('Frontend', tech)}
        />
        <div className="border-lightgray border-t"></div>

        <StackCategory
          title="Backend"
          stack={backendStack}
          onDeleteStack={(tech) => handleRemoveStack('Backend', tech)}
        />
        <div className="border-lightgray border-t"></div>

        <StackCategory
          title="DevOps"
          stack={devopsStack}
          onDeleteStack={(tech) => handleRemoveStack('DevOps', tech)}
        />
        <div className="border-lightgray border-t"></div>

        <StackCategory
          title="Other"
          stack={otherStack}
          onDeleteStack={(tech) => handleRemoveStack('Other', tech)}
        />
      </div>
    </div>
  )
}
