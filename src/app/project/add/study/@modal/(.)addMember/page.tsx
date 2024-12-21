import MemberModal from '@/components/project/modal/StudyModal'

export default function page() {
  const initialMembers = [
    { name: '홍길동', generation: '8기' },
    { name: '김철수', generation: '8기' },
    { name: 'dl', generation: '8기' },
    { name: '박민수', generation: '8기' },
    { name: '최수지', generation: '8기' },
    { name: '1', generation: '8기' },
    { name: '2', generation: '8기' },
    { name: '3', generation: '8기' },
    { name: '4', generation: '8기' },
    { name: '5', generation: '8기' },
  ]
  return <MemberModal initialMembers={initialMembers} />
}
