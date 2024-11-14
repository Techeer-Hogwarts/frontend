import React from 'react'
import MyCareerToggle from './MyCareerToggle'
import ExperienceItem from '../signup/ExperienceItem'

export interface MyExperienceSectionProps {
  title: string
  experienceStatus: string | null
  setExperienceStatus: (value: string) => void
  items: number[]
  addExperience: () => void
  removeExperience: (index: number) => void
}

export default function MyExperienceSection({
  title,
  experienceStatus,
  setExperienceStatus,
  items,
  addExperience,
  removeExperience,
}: MyExperienceSectionProps) {
  return (
    <div className="flex flex-col w-full">
      <MyCareerToggle
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
              btnPadding="px-6 py-2"
              onDelete={() => removeExperience(index)}
            />
          ))}
        </>
      )}
    </div>
  )
}
