import Member from '@/components/project/detail/Member'
import type { Meta, StoryObj } from '@storybook/react'
import { title } from 'process'
import { Component } from 'react'

const meta = {
  component: Member, // 어떤 컴포넌트를 Storybook에서 렌더링할지 정의
  title: 'Components/Member', //storybook의 사이드바에서 스토리가 어떻게 보여질지를 정의
} satisfies Meta<typeof Member> //타입 검사 과정에서 meta 객체가 Meta 타입으로 선언된 스토리북 메타데이터 규격을 준수하고 있는지 확인

export default meta
type Story = StoryObj<typeof meta>

// 기본 스토리 (5명의 멤버)
export const Default: Story = {
  args: {
    members: [
      { name: '홍길동', role: 'Backend' },
      { name: '김영희', role: 'Frontend' },
      { name: '이철수', role: 'Frontend' },
      { name: '박지훈', role: 'Backend' },
      { name: '최민수', role: 'Backend' },
    ],
  },
}

// 많은 멤버를 포함한 스토리
export const ManyMembers: Story = {
  args: {
    members: Array.from({ length: 13 }, (_, i) => ({
      name: `멤버 ${i + 1}`,
      role: 'Backend',
    })),
  },
}

// 멤버 수를 실시간으로 조정 
export const WithControls: Story = {
  args: {
    members: [{
      "name": "멤버 1",
      "role": "Backend"
    }, {
      "name": "멤버 2",
      "role": "Backend"
    }, {
      "name": "멤버 3",
      "role": "Backend"
    }, {
      "name": "멤버 4",
      "role": "Backend"
    }, {
      "name": "멤버 5",
      "role": "Backend"
    }, {
      "name": "멤버 6",
      "role": "Backend"
    }, {
      "name": "멤버 7",
      "role": "Backend"
    }, {
      "name": "멤버 8",
      "role": "Backend"
    }, {
      "name": "멤버 9",
      "role": "Backend"
    }, {
      "name": "멤버 10",
      "role": "Backend"
    }],
  },
  argTypes: {
    members: {
      control: {
        type: 'object',
      },
    },
  },
}

