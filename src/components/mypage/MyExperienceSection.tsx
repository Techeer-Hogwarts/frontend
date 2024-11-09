import React from 'react'
import MyExperienceItem from './MyExperienceItem'
import MyCareerToggle from './MyCareerToggle'

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
            <MyExperienceItem
              key={index}
              onDelete={() => removeExperience(index)}
            />
          ))}
        </>
      )}
    </div>
  )
}
