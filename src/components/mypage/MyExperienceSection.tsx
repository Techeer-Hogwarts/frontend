'use client'

import React from 'react'
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
  // 새 경험 항목 추가 함수
  const addExperience = () => {
    setExperienceData([...experienceData, {}])
  }

  // 경험 항목 삭제 함수
  const removeExperience = (index: number) => {
    const newData = [...experienceData]
    newData.splice(index, 1)
    setExperienceData(newData)
  }

  // 경험 업데이트 함수
  const updateExperience = (index: number, updatedItem: any) => {
    const newData = experienceData.map((item, i) =>
      i === index ? updatedItem : item,
    )
    setExperienceData(newData)
  }

  return (
    <div className="flex flex-col w-full">
      <MyCareerToggle
        title={title}
        value={experienceStatus}
        setValue={setExperienceStatus}
      />

      {(experienceStatus === '있어요' || experienceStatus === 'yes') && (
        <>
          <button
            type="button"
            onClick={addExperience}
            className="flex justify-end mt-2 text-primary items-center space-x-1"
          >
            <span>+</span>
            <span>경력 추가</span>
          </button>
          {experienceData.map((_, index) => (
            <ExperienceItem
              key={index}
              index={index}
              data={experienceData[index]}
              onChange={(updatedItem) => updateExperience(index, updatedItem)}
              onDelete={() => removeExperience(index)}
              experienceType={experienceType}
              btnPadding="px-6 py-2"
            />
          ))}
        </>
      )}
    </div>
  )
}
