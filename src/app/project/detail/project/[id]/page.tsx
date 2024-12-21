'use client'

import Profile from '@/components/project/detail/Profile'
import RecommendedMember from '@/components/project/detail/RecommendedMember'
import Member from '@/components/project/detail/Member'
import Stack from '@/components/project/detail/Stack'
import FindMember from '@/components/project/detail/FindMember'
import Results from '@/components/project/detail/Results'
import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ApplyModal from '@/components/project/modal/ApplyModal'

let members = [
  { name: '홍길동', role: 'Backend' },
  { name: '김영희', role: 'Frontend' },
  { name: '이철수', role: 'Frontend' },
  { name: '박지훈', role: 'Backend' },
  { name: '최민수', role: 'Backend' },
  { name: '최민수', role: 'Backend' },
  { name: '최민수', role: 'Backend' },
  { name: '최민수', role: 'Backend' },
  { name: '최민수', role: 'Backend' },
]

let stacks = {
  backendStack: [
    'Go Lang',
    'PostgreSQL',
    'Nest.JS',
    'Python',
    'Python',
    'Python',
    ,
    'Python',
    'Python',
    'Python',
    'Python',
  ],
  frontendStack: ['Zustand', 'Next.js', 'TS'],
  devopsStack: ['Jenkins CI', 'GCP', 'Terraform', 'Github Actions'],
}

export default function ProjectDetailpage() {
  const router = useRouter()

  const handleModal = () => {
    router.push('/project/detail/project/23/applyModal')
  }
  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      <div className="flex rounded-xl items-center justify-center border border-primary absolute top-[-1rem] right-0 w-[8.375rem] h-[2.125rem]">
        <Link
          href="/project/add"
          className="flex justify-center items-center gap-2 text-primary font-semibold"
        >
          <BiSolidPencil size={14} color="#FE9142" />
          편집하기
        </Link>
      </div>

      <div>
        <Profile />
        <RecommendedMember />
      </div>
      <div className="flex flex-col gap-7">
        <Member members={members} />
        <Stack stacks={stacks} />
        <FindMember />
        <Results />
        <button
          onClick={handleModal}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          지원하기
        </button>
      </div>
    </div>
  )
}
