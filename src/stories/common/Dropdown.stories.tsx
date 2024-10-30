import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Dropdown, { DropdownProps } from '@/components/common/Dropdown'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta

const Template: StoryFn<DropdownProps> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  return (
    <Dropdown
      {...args}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  options: ['Option 1', 'Option 2', 'Option 3'],
  selectedOptions: ['Option 1'],
}
