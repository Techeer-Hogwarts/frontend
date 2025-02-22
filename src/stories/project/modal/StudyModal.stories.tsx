// import { Meta, StoryObj } from '@storybook/react'
// import MemberModal from '@/components/project/modal/StudyModal'
// import withAppRouterContext from '../../../../.storybook/withAppRouterContext'

// const meta: Meta<typeof MemberModal> = {
//   component: MemberModal,
//   title: 'Components/StudyModal',
//   tags: ['autodocs'],
//   decorators: [withAppRouterContext],
// }

// export default meta

// type Story = StoryObj<typeof MemberModal>

// // 기본 스토리
// export const Default: Story = {
//   args: {
//     initialMembers: [
//       {
//         name: 'Kim Seojin',
//         generation: '1기',
//         imageSrc: '/profile1.jpg',
//       },
//       {
//         name: 'Lee Hana',
//         generation: '2기',
//         imageSrc: '/profile2.jpg',
//       },
//       {
//         name: 'Choi Minho',
//         generation: '3기',
//         imageSrc: null,
//       },
//     ],
//   },
// }

// // 초기 멤버가 없을 때
// export const NoInitialMembers: Story = {
//   args: {
//     initialMembers: [],
//   },
// }

// // 많은 멤버가 있을 때
// export const ManyMembers: Story = {
//   args: {
//     initialMembers: Array.from({ length: 20 }, (_, i) => ({
//       name: `Member ${i + 1}`,
//       generation: `${i + 1}th`,
//       imageSrc: i % 2 === 0 ? `/profile${(i % 5) + 1}.jpg` : null,
//     })),
//   },
// }
