import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import MypageTap from '@/components/mypage/MypageTap'

export default {
  title: 'Mypage/MypageTap',
  component: MypageTap,
  tags: ['autodocs'],
} as Meta

const Template: StoryFn = (args: any) => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'profile' | 'resume' | 'bookmark' | 'likes' | 'settings'
  >('home')

  return (
    <MypageTap {...args} activeTab={activeTab} setActiveTab={setActiveTab} />
  )
}

export const Default = Template.bind({})
Default.args = {}
