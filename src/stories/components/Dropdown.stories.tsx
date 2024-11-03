import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from '@/components/common/Dropdown'
import { useState } from 'react'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleDropdown: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    return (
      <Dropdown
        title="Select Option"
        options={['Option 1', 'Option 2', 'Option 3']}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    )
  },
}

export const MultipleDropdowns: Story = {
  render: () => {
    const [selectedOptions1, setSelectedOptions1] = useState<string[]>([])
    const [selectedOptions2, setSelectedOptions2] = useState<string[]>([])

    return (
      <div className="flex">
        <Dropdown
          title="Dropdown 1"
          options={['Option A', 'Option B', 'Option C']}
          selectedOptions={selectedOptions1}
          setSelectedOptions={setSelectedOptions1}
        />
        <Dropdown
          title="Dropdown 2"
          options={['Option X', 'Option Y', 'Option Z']}
          selectedOptions={selectedOptions2}
          setSelectedOptions={setSelectedOptions2}
        />
      </div>
    )
  },
}
