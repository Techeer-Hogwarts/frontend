import { Meta, StoryObj } from '@storybook/react'
import TapBar from '@/components/common/TapBar'

const meta: Meta<typeof TapBar> = {
  title: 'Components/TapBar',
  component: TapBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TapBar>

// 기본 TapBar 예제
export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
}

// 다양한 옵션으로 TapBar 테스트
export const MultipleOptions: Story = {
  args: {
    options: ['전체 보기', '모집 중'],
  },
}
