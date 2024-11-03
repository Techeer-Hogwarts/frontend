import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import ExperienceSection from '@/components/signup/ExperienceSection'

const meta: Meta<typeof ExperienceSection> = {
  title: 'Signup/ExperienceSection',
  component: ExperienceSection,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const ExperienceSectionStory = (args: any) => {
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

export const Default: Story = {
  render: ExperienceSectionStory,
  args: {
    title: '인턴 경험',
  },
}
