import Image from 'next/image'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'

interface OtherResume {
  otherData: Array<{
    name: string
    period: string
    position: string
    career: string
  }>
}

export default function OtherResume({ otherData }: OtherResume) {
  return (
    <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md">
      {otherData.map((user, index) => (
        <div key={index} className="flex justify-center my-3 gap-2">
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
