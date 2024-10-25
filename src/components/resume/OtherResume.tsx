import Image from 'next/image'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'

interface OtherResume {
  position: string
  career: string
}

export default function OtherResume({ position, career }: OtherResume) {
  // Ather 데이터 배열
  const otherData = [
    { name: '김미영', period: '8기', position: 'Frontend', career: '신입' },
    { name: '주영준', period: '6기', position: 'Backend', career: '경력' },
    { name: '이지은', period: '7기', position: 'DataEngineer', career: '경력' },
    // 필요한 만큼 데이터를 추가할 수 있습니다.
  ]

  return (
    <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md">
      {otherData.map((user, index) => (
        <div className="flex justify-center my-3 gap-2">
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
              <span className="font-semibold text-[0.8rem] text-primary">
                {user.period}
              </span>
            </div>
            <div className="flex gap-1">
              <PositionTag position={user.position} />
              <CareerTag career={user.career} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
