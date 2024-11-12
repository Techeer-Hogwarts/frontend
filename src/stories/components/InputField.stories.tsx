import { Meta, StoryObj } from '@storybook/react'
import InputField from '@/components/common/InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Label',
    name: 'default',
    placeholder: 'Type something...',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    name: 'withIcon',
    placeholder: 'Type something...',
    showIcon: true,
  },
}

export const RequiredField: Story = {
  args: {
    label: 'Required Field',
    name: 'required',
    placeholder: 'Type something...',
    required: true,
  },
}
