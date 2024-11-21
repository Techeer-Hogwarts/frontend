import type { Meta, StoryObj } from '@storybook/react'
import ProfileInputField from '@/components/mypage/ProfileInputField'

const meta = {
  title: 'Mypage/ProfileInputField',
  component: ProfileInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileInputField>

export default meta
type Story = StoryObj<typeof meta>

export const GithubInputField: Story = {
  args: {
    title: '깃허브',
    placeholder: '깃허브 주소',
  },
}
export const EmailInputField: Story = {
  args: {
    title: '이메일',
    placeholder: 'www.example.com',
  },
}
