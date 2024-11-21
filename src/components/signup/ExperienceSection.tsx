import React from 'react'
import ExperienceItem from '@/components/signup/ExperienceItem'
import CareerToggle from './CareerToggle'

export interface ExperienceSectionProps {
  title: string
  experienceStatus: string | null
  setExperienceStatus: (value: string) => void
  items: number[]
  addExperience: () => void
  removeExperience: (index: number) => void
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title,
  experienceStatus,
  setExperienceStatus,
  items,
  addExperience,
  removeExperience,
}) => {
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
          {items.map((_, index) => (
            <ExperienceItem
              key={index}
              btnPadding="px-3.5 py-2"
              onDelete={() => removeExperience(index)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ExperienceSection
