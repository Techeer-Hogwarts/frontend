import Image from 'next/image'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import { useEffect, useState } from 'react'
import { fetchUserResumes } from '@/app/resume/api/getUserResume'
import { useRouter } from 'next/navigation'

interface Resume {
  id: number
  createdAt: number
  title: string
  position: string
  year: number
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
        const userResumes = await fetchUserResumes(id, undefined, limit)

        // 새로운 API 응답 구조에 맞춰 데이터 처리
        if (!Array.isArray(userResumes.data)) {
          return
        }

        // 필요한 데이터 구조로 변환
        const formattedData: Resume[] = userResumes.data.map((resume: any) => ({
          id: resume.id,
          createdAt: new Date(resume.createdAt).getTime(),
          title: resume.title,
          position: resume.position, // API 응답에서 position 직접 사용
          year: 0, // API 응답에 user.year가 없으므로 기본값 사용
        }))

        setOtherData(formattedData)
      } catch (err: any) {
        console.error('다른 이력서 로드 실패:', err)
      }
    }

    loadUserResumes()
  }, [id, limit])

  const handleResumeClick = (id: number) => {
    router.push(`/resume/${id}`)
  }

  return (
    <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md mt-1">
      {otherData.map((user) => {
        const resumeTitle = user.title.split('-').slice(-1).join(' ')
        const truncatedTitle =
          resumeTitle.length > 14
            ? resumeTitle.slice(0, 14) + '...'
            : resumeTitle

        const formattedDate = new Date(user.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\.$/, '')

        return (
          <button
            key={user.id}
            onClick={() => handleResumeClick(user.id)}
            className="flex justify-left items-center py-3 pl-3 gap-2 hover:bg-lightprimary"
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
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium text-[1rem]">{truncatedTitle}</span>
              <div className="flex justify-between gap-2">
                <PositionTag position={user.position} />
                <span className="font-light text-[0.8rem]">
                  {formattedDate}
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
