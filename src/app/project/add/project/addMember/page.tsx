import MemberModal from '@/components/project/modal/ProjectModal'

export default function page() {
  const initialMembers = [
    { name: '홍길동', generation: '8기', imageSrc: '/profile1.png' },
    { name: '김철수', generation: '8기', imageSrc: '/profile2.png' },
    { name: 'dl', generation: '8기', imageSrc: '/profile3.png' },
    { name: '박민수', generation: '8기', imageSrc: '/profile4.png' },
    { name: '최수지', generation: '8기', imageSrc: '/profile5.png' },
  ]
  return <MemberModal />
}
