import BlogPost from '@/components/blog/BlogPost'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Blog/BlogPost',
  component: BlogPost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogPost>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '동계 부트캠프 회고록',
    date: '2024년 8월',
    name: '김아파트',
  },
}

export const LongTitle: Story = {
  args: {
    title:
      '토스 SLASH24 프론트엔드 트랙 - 토스가 오프라인 결제를 빠르고 안정적으로 혁신하는 방법',
    date: '2023년 12월',
    name: '주영준',
  },
}
