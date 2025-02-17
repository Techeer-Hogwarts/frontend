'use client'

import React, { useState } from 'react'
import MyCareerToggle from './MyCareerToggle'
import ExperienceItem from '../signup/ExperienceItem'

export interface Experience {
  id?: number
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  category?: string
  isFinished?: boolean
}

interface MyExperienceSectionProps {
  title: string
  experienceStatus: string | null
  setExperienceStatus: (value: string) => void
  experienceData: Experience[]
  setExperienceData: (data: Experience[]) => void
  experienceType: '인턴' | '정규직'
  onDeleteItem: (id: number) => void // 상위에서 삭제 API를 위해 ID를 등록
}

export default function MyExperienceSection({
  title,
  experienceStatus,
  setExperienceStatus,
  experienceData,
  setExperienceData,
  experienceType,
  onDeleteItem,
}: MyExperienceSectionProps) {
  const [nextTempId, setNextTempId] = useState(1)

  // 새 경험 항목 추가
  const addExperience = () => {
    const newItem: Experience = {
      id: -nextTempId, // 새 항목은 ID 없이 보냄(백엔드에서 CREATE 처리)
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isFinished: false,
    }
    setExperienceData([...experienceData, newItem])
    setNextTempId(nextTempId + 1)
  }

  // 경험 항목 삭제
  const removeExperience = (id?: number) => {
    // id가 있는 항목(원래 DB에 존재)은 상위 콜백으로 삭제 알림
    if (id !== undefined) {
      onDeleteItem(id)
    }
    // 로컬 배열에서도 제거
    const newData = experienceData.filter((item) => item.id !== id)
    setExperienceData(newData)
  }

  // 경험 항목 업데이트
  const updateExperience = (
    id: number | undefined,
    updatedItem: Experience,
  ) => {
    const newData = experienceData.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item,
    )
    setExperienceData(newData)
  }

  // 경험 상태(Toggle) 변경 시, "없어요"로 바뀌면 배열 비움
  const handleToggleChange = (value: string) => {
    setExperienceStatus(value)
    if (value === '없어요' || value === 'no') {
      // 이미 있던 ID들도 전부 삭제 API를 호출해야 한다면,
      // 상위 콜백을 통해 한꺼번에 처리할 수도 있음.
      // 여기서는 간단히 배열만 초기화
      setExperienceData([])
    }
  }

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
              key={item.id}
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
