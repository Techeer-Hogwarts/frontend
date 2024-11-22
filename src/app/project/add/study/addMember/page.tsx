import MemberModal from '@/components/project/modal/StudyModal'

const dummyMembers = [
  {
    name: '홍길동',
    generation: '1기',
    imageSrc: '/images/hong.jpg',
  },
  {
    name: '김철수',
    generation: '2기',
    imageSrc: '/images/kim.jpg',
  },
  {
    name: '이영희',
    generation: '3기',
    imageSrc: '/images/lee.jpg',
  },
  {
    name: '박민수',
    generation: '4기',
    imageSrc: '/images/park.jpg',
  },
  {
    name: '최수정',
    generation: '5기',
    imageSrc: '/images/choi.jpg',
  },
  {
    name: '강호준',
    generation: '6기',
    imageSrc: '/images/kang.jpg',
  },
]

export default function page() {
  return (
    <div>
      <MemberModal initialMembers={dummyMembers} />
    </div>
  )
}
