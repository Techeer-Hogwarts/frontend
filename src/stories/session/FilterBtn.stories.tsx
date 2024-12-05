import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import FilterBtn, { FilterBtnProps } from '../../components/session/FilterBtn'

export default {
  title: 'Session/FilterBtn',
  component: FilterBtn,
} as Meta

const Template: StoryFn<FilterBtnProps> = (args) => <FilterBtn {...args} />

export const Generation1 = Template.bind({})
Generation1.args = {
  title: '1기',
}
export const Generation2 = Template.bind({})
Generation2.args = {
  title: '2기',
}
export const PositionFrontend = Template.bind({})
PositionFrontend.args = {
  title: 'Frontend',
}
export const PositionBackend = Template.bind({})
PositionBackend.args = {
  title: 'Backend',
}
export const PositionDevOps = Template.bind({})
PositionDevOps.args = {
  title: 'DevOps',
}
