import AddBtn from '@/components/mypage/AddBtn'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Mypage/AddBtn',
  component: AddBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Project: Story = {
  args: {
    title: '+ 프로젝트 추가',
  },
}
export const Career: Story = {
  args: {
    title: '+ 경력 추가',
  },
}
export const Study: Story = {
  args: {
    title: '+ 스터디 추가',
  },
}