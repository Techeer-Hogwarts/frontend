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

export const BootCamp: Story = {
  args: {
    options: [
      '2022년 여름',
      '2022년 겨울',
      '2023년 여름',
      '2023년 겨울',
      '2024년 여름',
    ],
  },
}

export const Partners: Story = {
  args: {
    options: ['1기', '2기', '3기', '4기', '5기', '6기'],
  },
}
