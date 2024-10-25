import type { Meta, StoryObj } from '@storybook/react'
import ResumeFolder from '../components/resume/ResumeFolder'

const meta = {
  title: 'Resume/ResumeFolder',
  component: ResumeFolder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeFolder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
