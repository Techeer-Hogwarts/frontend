import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import PositionSelect, {
  PositionSelectProps,
} from '@/components/signup/PositionSelect'

export default {
  title: 'Signup/PositionSelect',
  component: PositionSelect,
} as Meta

const Template: StoryFn<PositionSelectProps> = (args) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])

  const handlePositionSelect = (position: string) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(
        selectedPositions.filter((item) => item !== position),
      )
    } else if (selectedPositions.length < 2) {
      setSelectedPositions([...selectedPositions, position])
    }
  }

  return (
    <PositionSelect
      {...args}
      selectedPositions={selectedPositions}
      handlePositionSelect={handlePositionSelect}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
