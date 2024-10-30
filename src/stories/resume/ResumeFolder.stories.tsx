import type { Meta, StoryObj } from '@storybook/react'
import ResumeFolder from '../../components/resume/ResumeFolder'

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
  args: {
    resumes: [
      {
        name: '박명수',
        period: '8기',
        position: 'Frontend',
        career: '신입',
        date: '2024.09.21',
      },
      {
        name: '유재석',
        period: '7기',
        position: 'Backend',
        career: '경력',
        date: '2024.09.19',
      },
      {
        name: '정준하',
        period: '6기',
        position: 'DataEngineer',
        career: '신입',
        date: '2024.09.18',
      },
    ],
  },
}

export const Frontend: Story = {
  args: {
    resumes: [
      {
        name: '박명수',
        period: '8기',
        position: 'Frontend',
        career: '신입',
        date: '2024.09.21',
      },
    ],
  },
}

export const Backend: Story = {
  args: {
    resumes: [
      {
        name: '유재석',
        period: '7기',
        position: 'Backend',
        career: '경력',
        date: '2024.09.19',
      },
    ],
  },
}
export const DataEngineer: Story = {
  args: {
    resumes: [
      {
        name: '정준하',
        period: '6기',
        position: 'DataEngineer',
        career: '신입',
        date: '2024.09.18',
      },
    ],
  },
}
