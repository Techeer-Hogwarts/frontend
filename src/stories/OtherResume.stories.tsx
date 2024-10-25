import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import OtherResumeList from '../components/resume/OtherResume'

const meta = {
  title: 'Resume/OtherResumeList',
  component: OtherResumeList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OtherResumeList>

export default meta
type Story = StoryObj<typeof meta>

export const Frontend: Story = {
  args: {
    position: 'Frontend',
    career: '신입',
  },
}

export const Backend: Story = {
  args: {
    position: 'Backend',
    career: '신입',
  },
}

export const DataEngineer: Story = {
  args: {
    position: 'DataEngineer',
    career: '신입',
  },
}
