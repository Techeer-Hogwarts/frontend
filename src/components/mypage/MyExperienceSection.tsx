'use client'

import React, { useState, useEffect } from 'react'
import MyCareerToggle from './MyCareerToggle'
import ExperienceItem from '../signup/ExperienceItem'

export interface MyExperienceSectionProps {
  readonly title: string
  readonly experienceStatus: string | null
  readonly setExperienceStatus: (value: string) => void
  // 기존에 API에서 받은 경험 데이터 (없으면 빈 배열)
  readonly initialExperiences?: any[]
  // 경험 타입: 'intern' 또는 'fullTime'
  readonly experienceType: 'intern' | 'fullTime'
}

export default function MyExperienceSection({
  title,
  experienceStatus,
  setExperienceStatus,
  initialExperiences = [],
  experienceType,
}: MyExperienceSectionProps) {
  // local state로 경험 데이터 관리 (초기값은 API에서 받은 데이터)
  const [experiences, setExperiences] = useState<any[]>(initialExperiences)

  // 새 경험 항목 추가 함수
  const addExperience = () => {
    setExperiences([...experiences, {}])
  }

  // 경험 항목 삭제 함수
  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  // 디버깅: 현재 경험 데이터 출력
  useEffect(() => {
    console.log(`${title} experiences:`, experiences)
  }, [experiences, title])

  // "있어요" 또는 "yes"일 때만 경험 항목 UI 표시
  const shouldShowExperienceUI =
    experienceStatus === '있어요' || experienceStatus === 'yes'

  return (
    <div className="flex flex-col w-full">
      <MyCareerToggle
        title={title}
        value={experienceStatus}
        setValue={setExperienceStatus}
      />
      {shouldShowExperienceUI && (
        <>
          <button
            type="button"
            onClick={addExperience}
            className="flex justify-end mt-2 text-primary items-center space-x-1"
          >
            <span>+</span>
            <span>경력 추가</span>
          </button>
          {experiences.map((expData, index) => (
            <ExperienceItem
              key={index}
              index={index}
              data={expData}
              onChange={(updated) => {
                setExperiences((prev) => {
                  const newExperiences = [...prev]
                  newExperiences[index] = updated
                  return newExperiences
                })
                console.log('Updated data:', updated)
              }}
              experienceType={experienceType}
              btnPadding="px-6 py-2"
              onDelete={() => removeExperience(index)}
            />
          ))}
        </>
      )}
    </div>
  )
}
