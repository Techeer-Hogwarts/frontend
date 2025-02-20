'use client'

import React, { useState, useEffect } from 'react'
import StackDropdown from './StackDropdown'
import { IoClose } from 'react-icons/io5'
import { RxQuestionMarkCircled } from 'react-icons/rx'

/** (1) 질문에서 주신 더미 데이터 */
const stacks = [
  { name: 'React.js', category: 'FRONTEND' },
  { name: 'Vue.js', category: 'FRONTEND' },
  { name: 'Next.js', category: 'FRONTEND' },
  { name: 'SvelteKit', category: 'FRONTEND' },
  { name: 'Angular', category: 'FRONTEND' },
  { name: 'Django', category: 'BACKEND' },
  { name: 'Flask', category: 'BACKEND' },
  { name: 'Ruby on Rails', category: 'BACKEND' },
  { name: 'Spring Boot', category: 'BACKEND' },
  { name: 'Express.js', category: 'BACKEND' },
  { name: 'Laravel', category: 'BACKEND' },
  { name: 'S3/Cloud Storage', category: 'DEVOPS' },
  { name: 'Go Lang', category: 'BACKEND' },
  { name: 'AI/ML (Tensorflow, PyTorch)', category: 'OTHER' },
  { name: 'Kubernetes', category: 'DEVOPS' },
  { name: 'Jenkins CI', category: 'DEVOPS' },
  { name: 'Github Actions', category: 'DEVOPS' },
  { name: 'Spinnaker', category: 'DEVOPS' },
  { name: 'Graphite', category: 'DEVOPS' },
  { name: 'Kafka', category: 'BACKEND' },
  { name: 'Docker', category: 'DEVOPS' },
  { name: 'Ansible', category: 'DEVOPS' },
  { name: 'Terraform', category: 'DEVOPS' },
  { name: 'FastAPI', category: 'BACKEND' },
  { name: 'Redis', category: 'BACKEND' },
  { name: 'MSA', category: 'BACKEND' },
  { name: 'Java', category: 'BACKEND' },
  { name: 'Python', category: 'BACKEND' },
  { name: 'JavaScript/TypeScript', category: 'FRONTEND' },
  { name: 'C/C++', category: 'BACKEND' },
  { name: 'C#', category: 'BACKEND' },
  { name: 'Ruby', category: 'BACKEND' },
  { name: 'AWS', category: 'DEVOPS' },
  { name: 'GCP', category: 'DEVOPS' },
  { name: 'ELK Stack', category: 'DEVOPS' },
  { name: 'Elasticsearch', category: 'DEVOPS' },
  { name: 'Prometheus', category: 'DEVOPS' },
  { name: 'Grafana', category: 'DEVOPS' },
  { name: 'Celery', category: 'BACKEND' },
  { name: 'Nginx', category: 'DEVOPS' },
  { name: 'CDN (CloudFront)', category: 'DEVOPS' },
  { name: 'Nest.JS', category: 'BACKEND' },
  { name: 'Zustand', category: 'FRONTEND' },
  { name: 'Tailwind CSS', category: 'FRONTEND' },
  { name: 'Bootstrap', category: 'FRONTEND' },
  { name: 'PostgreSQL', category: 'DATABASE' },
  { name: 'MySQL', category: 'DATABASE' },
  { name: 'MongoDB', category: 'DATABASE' },
  { name: 'Node.js', category: 'BACKEND' },
  { name: 'Apollo GraphQL', category: 'BACKEND' },
  { name: 'GraphQL', category: 'BACKEND' },
  { name: 'Redux', category: 'FRONTEND' },
  { name: 'MobX', category: 'FRONTEND' },
  { name: 'Vuex', category: 'FRONTEND' },
  { name: 'Jest', category: 'FRONTEND' },
  { name: 'Mocha', category: 'FRONTEND' },
  { name: 'Cypress', category: 'FRONTEND' },
  { name: 'Traefik', category: 'DEVOPS' },
  { name: 'Selenium', category: 'OTHER' },
  { name: 'gRPC', category: 'OTHER' },
  { name: 'Docker Compose', category: 'DEVOPS' },
  { name: 'Docker Swarm', category: 'DEVOPS' },
  { name: 'React Native', category: 'FRONTEND' },
  { name: 'Flutter', category: 'FRONTEND' },
  { name: 'Figma', category: 'OTHER' },
  { name: 'Zeplin', category: 'OTHER' },
  { name: 'NX', category: 'FRONTEND' },
  { name: 'Shadcn/ui', category: 'FRONTEND' },
  { name: 'Turborepo', category: 'FRONTEND' },
  { name: 'Lerna', category: 'FRONTEND' },
  { name: 'Chromatic', category: 'FRONTEND' },
  { name: 'PlayWright', category: 'FRONTEND' },
  { name: 'Storybook', category: 'FRONTEND' },
  { name: 'Vite', category: 'FRONTEND' },
  { name: 'Vitest', category: 'FRONTEND' },
  { name: 'K6', category: 'OTHER' },
  { name: 'Locust', category: 'OTHER' },
  { name: 'JMeter', category: 'OTHER' },
  { name: 'Postman', category: 'OTHER' },
  { name: 'Insomnia', category: 'OTHER' },
  { name: 'React Testing Library', category: 'FRONTEND' },
  { name: 'RabbitMQ', category: 'DEVOPS' },
]

/** (B) 카테고리 박스 */
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
        className="w-[0.7rem] h-[0.7rem] absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
      >
        <IoClose />
      </button>
    </div>
  )
}

/** (C) 스택 카테고리(Backend, Frontend, DevOps, Other) */
interface StackCategoryProps {
  title: string // 예: "Backend"
  stack: string[] // 현재 카테고리에 선택된 스택들
  onDeleteStack: (tech: string) => void // X 버튼 클릭 시 동작
}
const StackCategory = ({ title, stack, onDeleteStack }: StackCategoryProps) => {
  return (
    <div className="flex gap-[1rem]">
      <div className="text-darkPrimary w-[4.76319rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, idx) => (
          <Box key={idx} text={tech} onDelete={() => onDeleteStack(tech)} />
        ))}
      </div>
    </div>
  )
}

/** 최종 props에 onUpdateStacks 콜백 추가 */
interface AddStackProps {
  onUpdateStacks: (teamStacks: { stack: string; isMain: boolean }[]) => void
}

export default function AddStack({ onUpdateStacks }: AddStackProps) {
  // (1) 카테고리별 스택 상태
  const [backendStack, setBackendStack] = useState<string[]>([])
  const [frontendStack, setFrontendStack] = useState<string[]>([])
  const [devopsStack, setDevopsStack] = useState<string[]>([])
  const [otherStack, setotherStack] = useState<string[]>([])

  // (2) 드롭다운에서 선택된 전체 스택(공통 체크 상태)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // (3) 드롭다운에 표시할 카테고리들
  //     (FRONTEND, BACKEND, DEVOPS 만 추려서 표시)
  const [categories, setCategories] = useState<
    { name: string; options: string[] }[]
  >([])

  // (4) 컴포넌트 마운트 시 stacks를 필터링하여 categories 구성
  useEffect(() => {
    // 카테고리별로 스택 분류
    const catMap: Record<string, string[]> = {
      FRONTEND: [],
      BACKEND: [],
      DEVOPS: [],
      OTHER: [],
    }
    stacks.forEach((item) => {
      if (catMap[item.category]) {
        catMap[item.category].push(item.name)
      }
    })
    // FRONTEND, BACKEND, DEVOPS, OTHER 순서대로 categories 생성
    const result = [
      { name: 'FRONTEND', options: catMap.FRONTEND },
      { name: 'BACKEND', options: catMap.BACKEND },
      { name: 'DEVOPS', options: catMap.DEVOPS },
      { name: 'OTHER', options: catMap.OTHER },
    ]
    setCategories(result)
  }, [])

  // (5) 스택 <-> 카테고리 매핑 (드롭다운 체크/해제 시 사용)
  //     예: { 'React.js': 'FRONTEND', 'Go Lang': 'BACKEND', ... }
  const stackCategoryMap: Record<string, string> = {}
  stacks.forEach((s) => {
    stackCategoryMap[s.name] = s.category
  })

  // (6) 드롭다운에서 체크/해제 발생 시 카테고리 상태에 반영
  const handleSelectFromDropdown = (newSelected: string[]) => {
    // 추가된 스택들
    const added = newSelected.filter((item) => !selectedOptions.includes(item))
    // 제거된 스택들
    const removed = selectedOptions.filter(
      (item) => !newSelected.includes(item),
    )

    // 추가된 스택을 해당 카테고리에 삽입
    added.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND') {
        setFrontendStack((prev) => [...prev, name])
      } else if (cat === 'BACKEND') {
        setBackendStack((prev) => [...prev, name])
      } else if (cat === 'DEVOPS') {
        setDevopsStack((prev) => [...prev, name])
      } else if (cat === 'OTHER') {
        setotherStack((prev) => [...prev, name])
      }
    })

    // 제거된 스택을 해당 카테고리에서 제거
    removed.forEach((name) => {
      const cat = stackCategoryMap[name]
      if (cat === 'FRONTEND') {
        setFrontendStack((prev) => prev.filter((item) => item !== name))
      } else if (cat === 'BACKEND') {
        setBackendStack((prev) => prev.filter((item) => item !== name))
      } else if (cat === 'DEVOPS') {
        setDevopsStack((prev) => prev.filter((item) => item !== name))
      } else if (cat === 'OTHER') {
        setotherStack((prev) => prev.filter((item) => item !== name))
      }
    })

    // 최종 드롭다운 선택 상태 갱신
    setSelectedOptions(newSelected)
  }

  // (7) 카테고리 박스(X 버튼)에서 스택 제거 시
  //     → 해당 카테고리 상태에서 제거 + 드롭다운 선택 해제
  const handleRemoveStack = (category: string, stackName: string) => {
    if (category === 'Backend') {
      setBackendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'Frontend') {
      setFrontendStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'DevOps') {
      setDevopsStack((prev) => prev.filter((item) => item !== stackName))
    } else if (category === 'Other') {
      setotherStack((prev) => prev.filter((item) => item !== stackName))
    }

    // 드롭다운 선택 해제
    setSelectedOptions((prev) => prev.filter((item) => item !== stackName))
  }

  // (8) 각 카테고리 배열을 모아서 teamStacks 만들기
  //     카테고리별 "첫 번째 스택"은 isMain: true, 나머지는 false
  function buildTeamStacks() {
    const result: { stack: string; isMain: boolean }[] = []

    // Frontend
    frontendStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    // Backend
    backendStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    // DevOps
    devopsStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })
    // Other
    otherStack.forEach((s, idx) => {
      result.push({ stack: s, isMain: idx === 0 })
    })

    return result
  }

  // (9) 카테고리 상태가 바뀔 때마다 teamStacks를 재구성해서 부모로 전달
  useEffect(() => {
    const newTeamStacks = buildTeamStacks()
    onUpdateStacks(newTeamStacks)
  }, [frontendStack, backendStack, devopsStack, otherStack])

  return (
    <div>
      <div className="flex items-center mb-4 gap-2 justify-between">
        <div className="flex items-center font-medium text-gray">
          기술 스택을 입력해주세요<span className="text-primary">*</span>
        </div>

        {/* (D) 드롭다운 배치: 카테고리와 선택 상태 전달 */}
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

      {/* 하단: 카테고리별 박스 표시 */}
      <div className="flex flex-col w-[52.5rem] border border-gray p-4 rounded-2xl gap-4">
        {/* Frontend 박스 */}
        <StackCategory
          title="Frontend"
          stack={frontendStack}
          onDeleteStack={(tech) => handleRemoveStack('Frontend', tech)}
        />
        <div className="border-lightgray border-t"></div>

        {/* Backend 박스 */}
        <StackCategory
          title="Backend"
          stack={backendStack}
          onDeleteStack={(tech) => handleRemoveStack('Backend', tech)}
        />
        <div className="border-lightgray border-t"></div>

        {/* DevOps 박스 */}
        <StackCategory
          title="DevOps"
          stack={devopsStack}
          onDeleteStack={(tech) => handleRemoveStack('DevOps', tech)}
        />
        <div className="border-lightgray border-t"></div>

        {/* Other 박스 */}
        <StackCategory
          title="Other"
          stack={otherStack}
          onDeleteStack={(tech) => handleRemoveStack('Other', tech)}
        />
      </div>
    </div>
  )
}
