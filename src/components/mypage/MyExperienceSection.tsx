'use client'

import React, { useState } from 'react'
import MyCareerToggle from './MyCareerToggle'
import ExperienceItem from '../signup/ExperienceItem'

export interface MyExperienceSectionProps {
  readonly title: string
  readonly experienceStatus: string | null
  readonly setExperienceStatus: (value: string) => void
  readonly experienceData: any[]
  readonly setExperienceData: (data: any[]) => void
  readonly experienceType: '인턴' | '정규직'
}

export default function MyExperienceSection({
  title,
  experienceStatus,
  setExperienceStatus,
  experienceData,
  setExperienceData,
  experienceType,
}: MyExperienceSectionProps) {
  // 고유 ID를 생성하기 위한 상태
  const [nextId, setNextId] = useState(() => {
    // 이미 존재하는 항목 중 가장 큰 id를 찾고 +1로 시작하거나, 기본 1로 시작
    const maxExistingId = experienceData.reduce(
      (max: number, item: any) => (item.id && item.id > max ? item.id : max),
      0,
    )
    return maxExistingId + 1
  })

  // 새 경험 항목 추가
  const addExperience = () => {
    const newItem = {
      id: nextId,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
    }
    setExperienceData([...experienceData, newItem])
    setNextId(nextId + 1)
  }

  // 경험 항목 삭제 (id로 식별)
  const removeExperience = (id: number) => {
    const newData = experienceData.filter((item) => item.id !== id)
    setExperienceData(newData)
  }

  // 경험 항목 업데이트 (id로 식별)
  const updateExperience = (id: number, updatedItem: any) => {
    const newData = experienceData.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item,
    )
    setExperienceData(newData)
  }

  // 경험 상태(Toggle) 변경 시, "없어요"/"no"로 바뀌면 경력 배열 초기화
  const handleToggleChange = (value: string) => {
    setExperienceStatus(value)

    // "없어요" 혹은 "no"라면 경력 배열 비우기
    if (value === '없어요' || value === 'no') {
      setExperienceData([])
    }
  }

  // "있어요" or "yes"인 경우에만 ExperienceItem을 보여줍니다.
  const shouldShow = experienceStatus === '있어요' || experienceStatus === 'yes'

  return (
    <div className="flex flex-col w-full">
      <MyCareerToggle
        title={title}
        value={experienceStatus}
        setValue={handleToggleChange}
      />

      {shouldShow && (
        <>
          <button
            type="button"
            onClick={addExperience}
            className="flex justify-end mt-2 text-primary items-center space-x-1"
          >
            <span>+</span>
            <span>경력 추가</span>
          </button>
          {experienceData.map((item) => (
            <ExperienceItem
              key={item.id} // 여기서 고유 id 사용
              data={item}
              onChange={(updated) => updateExperience(item.id, updated)}
              onDelete={() => removeExperience(item.id)}
              experienceType={experienceType}
              btnPadding="px-6 py-2"
            />
          ))}
        </>
      )}
    </div>
  )
}
