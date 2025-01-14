import Image from 'next/image'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import { useEffect, useState } from 'react'
import { fetchUserResumes } from '@/app/resume/api/getUserResume'
import { useRouter } from 'next/navigation'

interface Resume {
  id: number // 고유 식별자 추가
  name: string
  position: string
  career: string
  category: string
}

interface OtherResumeProps {
  id: number
  offset: number
  limit: number
}

export default function OtherResume({ id, offset, limit }: OtherResumeProps) {
  const [otherData, setOtherData] = useState<Resume[]>([])
  const router = useRouter() // useRouter 훅 추가

  useEffect(() => {
    async function loadUserResumes() {
      try {
        const userResumes = await fetchUserResumes(id, offset, limit)

        // 필요한 데이터 구조로 변환
        const formattedData: Resume[] = userResumes.map((resume: any) => ({
          id: resume.id,
          name: resume.user.name,
          position: resume.user.mainPosition,
          career: resume.user.isIntern ? '경력' : '신입',
          category: resume.category,
        }))

        setOtherData(formattedData)
      } catch (err: any) {
        console.error('Error fetching resumes:', err)
      }
    }

    loadUserResumes()
  }, [])

  const handleResumeClick = (id: number) => {
    router.push(`/detail/${id}`)
  }
  return (
    <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md">
      {otherData.map((user) => (
        <button
          key={user.id}
          onClick={() => handleResumeClick(user.id)}
          className="flex justify-center my-3 gap-2"
          role="button"
          tabIndex={0}
        >
          <Image
            src="/file.png"
            width={30}
            height={30}
            alt="file"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              <span className="font-medium text-[1rem]">{user.name}</span>
            </div>
            <div className="flex gap-1">
              <PositionTag position={user.position} />
              <CareerTag career={user.career} />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
