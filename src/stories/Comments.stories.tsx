import type { Meta, StoryObj } from '@storybook/react'
import Comments from '../components/resume/Comments'

const meta = {
  title: 'Resume/Comments',
  component: Comments,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Comments>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
