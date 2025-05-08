import SessionPost from '@/components/session/SessionPost'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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
const likeList = ['테스트']
export const Default: Story = {
  args: {
    title: '동계 부트캠프 회고록',
    date: '2024년 8월',
    likeCount: 0,
    presenter: '김아파트',
    id: '2',
    showMessage: () => {},
    thumbnail:
      'data:image/jpeg;base64,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',
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    userId: '1',

    likeList: likeList,
    onLikeUpdate: () => {},
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
    showMessage: () => {},
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bfSaoPCshv-N6GeH30uUuosNsaAUrulPvA&s',
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    userId: '1',

    likeList: likeList,
    onLikeUpdate: () => {},
  },
}
