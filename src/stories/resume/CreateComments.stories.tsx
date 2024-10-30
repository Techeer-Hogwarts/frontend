import type { Meta, StoryObj } from '@storybook/react'
import Create from '../../components/resume/CreateComment'

// Storybook Meta 설정
const meta: Meta<typeof Create> = {
  title: 'Resume/CreateComments',
  component: Create,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

// Create 컴포넌트 스토리 설정
export const Default: StoryObj<typeof Create> = {}
