import type { Meta, StoryObj } from '@storybook/react'
import Comments from '../../components/resume/Comments'

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
  args: {
    comments: [
      {
        id: 1,
        name: '박철수',
        date: '2024.10.03',
        comment:
          '이 프로젝트는 협업과 커뮤니케이션에서 강점이 있었던 것 같습니다. 하지만 기술적으로 좀 더 개선할 부분이 있습니다.',
      },
    ],
  },
}

export const Long: Story = {
  args: {
    comments: [
      {
        id: 2,
        name: '김미영',
        date: '2024.10.02',
        comment:
          '해당 사례에서는 PM 직무에서 발휘할 만한 역량이 보이지가 않습니다. PM 중요 직무 역량 중 질문에 쓰일만한 사례를 추리고 그 역량을 분명히 드러내야 합니다. 해당 사례에서는 PM 직무에서 발휘할 만한 역량이 보이지가 않습니다. PM 중요 직무 역량 중 질문에 쓰일만한 사례를 추리고 그 역량을 분명히 드러내야 합니다.',
      },
    ],
  },
}
