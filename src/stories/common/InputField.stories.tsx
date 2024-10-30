import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import InputField, { InputFieldProps } from '@/components/common/InputField'

export default {
  title: 'Components/InputField',
  component: InputField,
} as Meta

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Default Label',
  name: 'default',
  placeholder: 'Type something...',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'With Icon',
  name: 'withIcon',
  placeholder: 'Type something...',
  showIcon: true,
}

export const RequiredField = Template.bind({})
RequiredField.args = {
  label: 'Required Field',
  name: 'required',
  placeholder: 'Type something...',
  required: true,
}
