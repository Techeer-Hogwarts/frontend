import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import PositionSelect from '@/components/signup/PositionSelect'

const meta: Meta<typeof PositionSelect> = {
  title: 'Signup/PositionSelect',
  component: PositionSelect,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
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
  },
  args: {},
}
