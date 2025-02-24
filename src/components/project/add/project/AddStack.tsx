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
      <div className="text-darkPrimary w-[4.875rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2 w-[712px]">
        {stack.map((tech, idx) => (
          <Box
            key={tech}
            text={tech}
            isMain={idx === 0}
            onDelete={() => onDeleteStack(tech)}
          />
        ))}
      </div>
    </div>
  )
}

interface TeamStackItem {
  stack: string
  isMain: boolean
}

interface AddStackProps {
  /** 수정 시 이미 서버에 저장된 teamStacks */
  initialTeamStacks?: TeamStackItem[]
  /** 최종 스택이 바뀔 때마다 부모로 콜백 */
  onUpdateStacks: (teamStacks: TeamStackItem[]) => void
}

export default function AddStack({
  initialTeamStacks = [],
  onUpdateStacks,
}: AddStackProps) {
  const [frontendStack, setFrontendStack] = useState<string[]>([])
  const [backendStack, setBackendStack] = useState<string[]>([])
  const [devopsStack, setDevopsStack] = useState<string[]>([])
  const [otherStack, setOtherStack] = useState<string[]>([])

  // 드롭다운에서 선택된 전체 스택 이름들
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // 서버에서 받아온 "스택 목록"을 카테고리별로 분류해서 저장
  const [categories, setCategories] = useState<
    { name: string; options: string[] }[]
  >([])

  // **초기화 여부** (한 번만 초기화하려고 사용)
  const [didInitialize, setDidInitialize] = useState(false)

  // 1) 서버에서 스택 목록 받아오기
  const { data: allStacks } = useQuery({
    queryKey: ['getStacks'],
    queryFn: getStacks,
  })

  // 2) allStacks를 카테고리별로 분류
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

    setCategories([
      { name: 'FRONTEND', options: catMap.FRONTEND },
      { name: 'BACKEND', options: catMap.BACKEND },
      { name: 'DEVOPS', options: catMap.DEVOPS },
      { name: 'OTHER', options: catMap.OTHER },
    ])
  }, [allStacks])

  // 3) 스택이름 -> 카테고리 매핑용
  const stackCategoryMap: Record<string, string> = {}
  if (allStacks) {
    allStacks.forEach((s: { name: string; category: string }) => {
      stackCategoryMap[s.name] = s.category
    })
  }

  // 4) **처음 로드** + `initialTeamStacks`가 0보다 크면 → 초기값 세팅
  useEffect(() => {
    // (A) 이미 초기화(didInitialize) 했다면 종료
    if (didInitialize) return
    // (B) allStacks 로딩 안됐으면 종료
    if (!allStacks) return
    // (C) initialTeamStacks가 1개 이상인 경우만 초기화
    if (initialTeamStacks.length === 0) return

    // ...이제 초기화 로직
    const frontArr: string[] = []
    const backArr: string[] = []
    const devopsArr: string[] = []
    const otherArr: string[] = []
    const selectedArr: string[] = []

    initialTeamStacks.forEach(({ stack }) => {
      const cat = stackCategoryMap[stack]
      if (cat === 'FRONTEND') {
        frontArr.push(stack)
      } else if (cat === 'BACKEND') {
        backArr.push(stack)
      } else if (cat === 'DEVOPS') {
        devopsArr.push(stack)
      } else {
        // OTHER
        otherArr.push(stack)
      }
      selectedArr.push(stack)
    })

    // setState
    setFrontendStack(frontArr)
    setBackendStack(backArr)
    setDevopsStack(devopsArr)
    setOtherStack(otherArr)
    setSelectedOptions(selectedArr)

    // 이제 "한 번 초기화함"
    setDidInitialize(true)
  }, [didInitialize, allStacks, initialTeamStacks, stackCategoryMap])

  // 5) 드롭다운 체크/해제
  const handleSelectFromDropdown = (newSelected: string[]) => {
    const added = newSelected.filter((item) => !selectedOptions.includes(item))
    const removed = selectedOptions.filter(
      (item) => !newSelected.includes(item),
    )

    // 추가된 스택들
    added.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND') setFrontendStack((prev) => [...prev, name])
      else if (cat === 'BACKEND') setBackendStack((prev) => [...prev, name])
      else if (cat === 'DEVOPS') setDevopsStack((prev) => [...prev, name])
      else setOtherStack((prev) => [...prev, name])
    })

    // 제거된 스택들
    removed.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND') {
        setFrontendStack((prev) => prev.filter((x) => x !== name))
      } else if (cat === 'BACKEND') {
        setBackendStack((prev) => prev.filter((x) => x !== name))
      } else if (cat === 'DEVOPS') {
        setDevopsStack((prev) => prev.filter((x) => x !== name))
      } else {
        setOtherStack((prev) => prev.filter((x) => x !== name))
      }
    })

    setSelectedOptions(newSelected)
  }

  // 6) X 버튼으로 제거
  const handleRemoveStack = (category: string, stackName: string) => {
    if (category === 'Frontend') {
      setFrontendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'Backend') {
      setBackendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'DevOps') {
      setDevopsStack((prev) => prev.filter((item) => item !== stackName))
    } else {
      setOtherStack((prev) => prev.filter((item) => item !== stackName))
    }
    // 드롭다운 선택 해제
    setSelectedOptions((prev) => prev.filter((item) => item !== stackName))
  }

  // 7) teamStacks 구성 (메인 스택은 카테고리별 첫 번째)
  function buildTeamStacks() {
    const result: { stack: string; isMain: boolean }[] = []

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

  // 8) state가 변할 때마다 부모에 알림
  useEffect(() => {
    // didInitialize가 true든 false든, 매번 최신화
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
