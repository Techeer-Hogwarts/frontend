import SessionDropdown from '@/components/session/SessionDropdown'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Session/SessionDropdown',
  component: SessionDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SessionDropdown>

export default meta
type Story = StoryObj<typeof meta>
const handleDropdownChange = () => {
}
export const BootCamp: Story = {
  args: {
    titles: [
      '2022년 여름',
      '2022년 겨울',
      '2023년 여름',
      '2023년 겨울',
      '2024년 여름',
    ],
    options: [
      'SUMMER_2022',
      'WINTER_2022',
      'SUMMER_2023',
      'WINTER_2023',
      'SUMMER_2024',
    ],
    onSelect: handleDropdownChange,
  },
}

export const Partners: Story = {
  args: {
    titles: ['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기'],
    options: [
      'FIRST',
      'SECOND',
      'THIRD',
      'FOURTH',
      'FIFTH',
      'SIXTH',
      'SEVENTH',
      'EIGHTH',
    ],
    onSelect: handleDropdownChange,
  },
}
