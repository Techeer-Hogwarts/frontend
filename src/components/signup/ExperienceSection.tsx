import React from 'react'
import ExperienceItem from '@/components/signup/ExperienceItem'
import CareerToggle from './CareerToggle'

export interface ExperienceSectionProps {
  title: string
  experienceStatus: string | null
  setExperienceStatus: (value: string) => void
  experienceData: any[]
  setExperienceData: (data: any[]) => void
  experienceType: 'intern' | 'fullTime'
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title,
  experienceStatus,
  setExperienceStatus,
  experienceData,
  setExperienceData,
  experienceType,
}) => {
  // 경력 추가 함수
  const addExperience = () => {
    setExperienceData([...experienceData, {}]) // 빈 객체 추가
  }

  // 경력 삭제 함수
  const removeExperience = (index: number) => {
    const newData = experienceData.filter((_, i) => i !== index)
    setExperienceData(newData)
  }

  // 경력 업데이트 함수
  const updateExperience = (index: number, updatedItem: any) => {
    const newData = experienceData.map((item, i) =>
      i === index ? updatedItem : item,
    )
    setExperienceData(newData)
  }

  return (
    <div className="flex flex-col w-[30.25rem]">
      <CareerToggle
        title={title}
        value={experienceStatus}
        setValue={setExperienceStatus}
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
          {experienceData.map((_, index) => (
            <ExperienceItem
              key={index}
              index={index}
              data={experienceData[index]}
              onDelete={() => removeExperience(index)}
              onChange={(updatedItem) => updateExperience(index, updatedItem)}
              experienceType={experienceType}
              btnPadding={''}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ExperienceSection
