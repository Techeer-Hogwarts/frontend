import React, { useState } from 'react'
import ExperienceItem from '@/components/signup/ExperienceItem'
import CareerToggle from './CareerToggle'

export interface ExperienceSectionProps {
  title: string
  experienceStatus: string | null
  setExperienceStatus: (value: string) => void
  experienceData: any[]
  setExperienceData: (data: any[]) => void
  experienceType: '인턴' | '정규직'
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title,
  experienceStatus,
  setExperienceStatus,
  experienceData,
  setExperienceData,
  experienceType,
}) => {
  // 항목에 고유 ID를 부여하기 위한 상태
  const [nextId, setNextId] = useState(() => {
    // 이미 있는 항목 중 가장 큰 id + 1 로 시작하거나, 기본 1로 시작
    const maxExistingId = experienceData.reduce(
      (maxId, item) => (item.id && item.id > maxId ? item.id : maxId),
      0,
    )
    return maxExistingId + 1
  })

  // 경력 추가 함수
  const addExperience = () => {
    const newItem = {
      id: nextId, // 새 항목에 고유 ID
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isFinished: false,
      description: '',
    }
    setExperienceData([...experienceData, newItem])
    setNextId(nextId + 1) // 다음에 쓸 ID 증가
  }

  // 경력 삭제 함수 (id로 삭제)
  const removeExperience = (id: number) => {
    const newData = experienceData.filter((item) => item.id !== id)
    setExperienceData(newData)
  }

  // 경력 업데이트 함수 (id로 갱신)
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

  return (
    <div className="flex flex-col w-[30.25rem]">
      <CareerToggle
        title={title}
        value={experienceStatus}
        setValue={handleToggleChange}
      />

      {experienceStatus === 'yes' && (
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
              onDelete={() => removeExperience(item.id)}
              onChange={(updatedItem) => updateExperience(item.id, updatedItem)}
              experienceType={experienceType}
              btnPadding=""
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ExperienceSection
