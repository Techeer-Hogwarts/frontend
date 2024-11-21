import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import MypageTap, { MypageTapProps } from '@/components/mypage/MypageTap'

export default {
  title: 'Mypage/MypageTap',
  component: MypageTap,
  tags: ['autodocs'],
} as Meta

const Template: Story<MypageTapProps> = (args) => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'profile' | 'resume' | 'bookmark' | 'likes' | 'settings'
  >('home')

  return (
    <MypageTap {...args} activeTab={activeTab} setActiveTab={setActiveTab} />
  )
}

// 기본 상태
export const Default = Template.bind({})
Default.args = {
  // 여기에 기본 props 값을 넣어줍니다. 필요한 경우 추가하세요.
}
