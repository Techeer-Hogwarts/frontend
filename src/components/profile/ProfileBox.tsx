import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'
import Image from 'next/image'

interface ProfileProps {
  profileData: {
    id: number
    name: string
    email: string
    mainPosition: string
    school: string
    class: string
    profileImage: string
    githubUrl: string
    blogUrl: string
  }
}

export default function ProfileBox({ profileData }: ProfileProps) {
  if (!profileData) {
    return <div>프로필 정보를 가져오는 중입니다...</div>
  }
  const {
    name,
    email,
    mainPosition,
    school,
    profileImage,
    githubUrl,
    blogUrl,
  } = profileData

  return (
    <div className="flex w-[19rem] h-[23rem]">
      {/* Folder 이미지 */}
      <div className="relative z-0">
        <Image src="/folder.svg" alt="Folder" width={242} height={374} />
        <div className=" absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
          {/** 프로필 사진 */}
          <div className="flex w-[11rem] h-[11rem] bg-gray-200 rounded-xl">
            <Image
              // src="/pro.png"
              src={profileImage}
              width={176}
              height={176}
              alt="Profile"
              style={{ objectFit: 'contain', borderRadius: '18px' }}
            />
          </div>
          {/** 이름/아이콘*/}
          <div className="flex flex-row justify-between mt-1">
            <div className="text-[1.25rem] font-medium">{name}</div>
            <div className="flex flex-row gap-2 ">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Image
                  src="/git.svg"
                  alt="GitHub"
                  width={18}
                  height={18}
                  className="items-center h-full pb-[3px]"
                />
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Image
                  src="/blog.svg"
                  alt="Blog"
                  width={18}
                  height={18}
                  className="items-center h-full pb-[3px]"
                />
              </a>
            </div>
          </div>
          {/** 이메일 */}
          <div className="flex text-[0.7rem] text-gray-600">
            {/* wndudwns6824@naver.com */}
            {email}
          </div>
          {/** 소속 정보 */}
          <div className="flex flex-row justify-between gap-2 mt-1">
            <div className="">{school}</div>
            <span className="h-[1.25rem] mt-[0.125rem] border-right border-[0.08rem] border-gray"></span>
            <div className="">4학년</div>
            <span className="h-[1.25rem] mt-[0.125rem] border-right border-[0.08rem] border-gray"></span>
            <div className="">8기</div>
          </div>
          {/** 포지션/경력 */}
          <div className="flex flex-row gap-2 mt-1">
            <PositionTag position={mainPosition} />
            <CareerTag career={school} />
          </div>
        </div>
      </div>
    </div>
  )
}
