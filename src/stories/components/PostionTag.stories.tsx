import type { Meta, StoryObj } from '@storybook/react'
import PositionTag from '../../components/common/PositionTag'

// Storybook Meta 설정
const meta: Meta<typeof PositionTag> = {
  title: 'Components/PositionTag',
  component: PositionTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['Frontend', 'Backend', 'DataEngineer', 'Other'],
    },
  },
}

export default meta

// 각 포지션별 스토리 설정

export const Frontend: StoryObj<typeof PositionTag> = {
  args: {
    position: 'Frontend',
  },
}

export const Backend: StoryObj<typeof PositionTag> = {
  args: {
    position: 'Backend',
  },
}

export const DataEngineer: StoryObj<typeof PositionTag> = {
  args: {
    position: 'DataEngineer',
  },
}

export const Other: StoryObj<typeof PositionTag> = {
  args: {
    position: 'Designer', // 기본값을 테스트하기 위해 "Designer"와 같은 다른 포지션을 설정
  },
}
