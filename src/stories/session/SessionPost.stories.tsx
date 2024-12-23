import SessionPost from '@/components/session/SessionPost'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Session/SessionPost',
  component: SessionPost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SessionPost>

export default meta
type Story = StoryObj<typeof meta>
const onDelete = (id: string) => {
  console.log(`Deleted post with id: ${id}`)
}
export const Default: Story = {
  args: {
    title: '동계 부트캠프 회고록',
    date: '2024년 8월',
    presenter: '김아파트',
    id: '2',
    likeCount: 0,
    thumbnail:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    onDelete: onDelete,
  },
}

export const LongTitle: Story = {
  args: {
    title:
      '토스 SLASH24 프론트엔드 트랙 - 토스가 오프라인 결제를 빠르고 안정적으로 혁신하는 방법',
    date: '2023년 12월',
    presenter: '주영준',
    id: '2',
    likeCount: 0,
    thumbnail:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    onDelete: onDelete,
  },
}
