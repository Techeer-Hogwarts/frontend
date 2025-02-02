import type { Meta, StoryObj } from '@storybook/react'
import OtherResumeList from '../../components/resume/OtherResume'

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

export const Default: Story = {
  args: {
    id: 1, // id 값 제공
    offset: 0, // offset 값 제공
    limit: 10, // limit 값 제공
    // otherData: [
    //   { name: '김미영', period: '8기', position: 'Frontend', career: '신입' },
    //   { name: '주영준', period: '6기', position: 'Backend', career: '경력' },
    //   {
    //     name: '이지은',
    //     period: '7기',
    //     position: 'DataEngineer',
    //     career: '경력',
    //   },
    // ],
  },
}
