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
const onDelete = (id: string) => {}
const likeList = ['테스트']
export const Default: Story = {
  args: {
    title: '동계 부트캠프 회고록',
    date: '2024년 8월',
    authorName: '김아파트',
    userName: '주영준',
    userImage: 'https://miro.medium.com/v2/0*3PiUZ2c3GwLKvnya',
    category: 'TECHEER',
    id: '2',
    likeCount: 0,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    image: '/images/default-thumbnail.png',
    onDelete: onDelete,
    likeList: likeList,
    authorImage: 'https://miro.medium.com/v2/0*3PiUZ2c3GwLKvnya',
  },
}

export const LongTitle: Story = {
  args: {
    title:
      '토스 SLASH24 프론트엔드 트랙 - 토스가 오프라인 결제를 빠르고 안정적으로 혁신하는 방법',
    date: '2023년 12월',
    authorName: '김아파트',
    userName: '주영준',
    userImage: 'https://miro.medium.com/v2/0*3PiUZ2c3GwLKvnya',
    category: 'SHARED',
    id: '2',
    likeCount: 0,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    image: '/images/default-thumbnail.png',
    onDelete: onDelete,
    likeList: likeList,
    authorImage: 'https://miro.medium.com/v2/0*3PiUZ2c3GwLKvnya',
  },
}
