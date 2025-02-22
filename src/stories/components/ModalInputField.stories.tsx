import ModalInputField from '@/components/common/ModalInputField'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'components/ModalInputField',
  component: ModalInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalInputField>

export default meta
type Story = StoryObj<typeof meta>
const value = '가나다'
const handleInputChange = () => {
  console.log('handleInputChange')
}
export const Default: Story = {
  args: {
    name: 'title',
    value: value,
    essential: '*',
    handleInputChange: handleInputChange,
    title: '입력 제목에 대한 내용입니다',
    placeholder: 'placeholder',
  },
}
