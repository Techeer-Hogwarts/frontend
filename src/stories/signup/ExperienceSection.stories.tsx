import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ExperienceSection, {
  ExperienceSectionProps,
} from '@/components/signup/ExperienceSection'

export default {
  title: 'Signup/ExperienceSection',
  component: ExperienceSection,
} as Meta

const Template: StoryFn<ExperienceSectionProps> = (args) => {
  const [experienceStatus, setExperienceStatus] = useState<string | null>(null)
  const [items, setItems] = useState<number[]>([])

  const addExperience = () => setItems([...items, items.length + 1])
  const removeExperience = (index: number) =>
    setItems(items.filter((_, i) => i !== index))

  return (
    <ExperienceSection
      {...args}
      experienceStatus={experienceStatus}
      setExperienceStatus={setExperienceStatus}
      items={items}
      addExperience={addExperience}
      removeExperience={removeExperience}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  title: '인턴 경험',
}
