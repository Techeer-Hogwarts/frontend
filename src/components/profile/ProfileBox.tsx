import FolderSVG from '../../../public/folder.svg'
import GitSVG from '../../../public/git.svg'
import BlogSVG from '../../../public/blog.svg'
import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'
import Image from 'next/image'

interface Profile {
  position: string
  career: string
}

export default function ProfileBox({ position, career }: Profile) {
  return (
    <div className="flex w-[19rem] h-[23rem]">
      {/* Folder 이미지 */}
      <div className="relative z-0">
        <FolderSVG />
        <div className=" absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
          {/** 프로필 사진 */}
          <div className="flex w-[11rem] h-[11rem] bg-gray-200 rounded-xl">
            <Image
              src="/pro.png"
              width={176}
              height={176}
              alt="Profile"
              style={{ objectFit: 'contain', borderRadius: '18px' }}
            />
          </div>
          {/** 이름/아이콘*/}
          <div className="flex flex-row justify-between mt-1">
            <div className="text-[1.25rem] font-medium">박명수</div>
            <div className="flex flex-row">
              <GitSVG alt="git" width={30} height={30} />
              <BlogSVG alt="blog" width={30} height={30} />
            </div>
          </div>
          {/** 이메일 */}
          <div className="flex text-[0.7rem] text-gray-600">
            wndudwns6824@naver.com
          </div>
          {/** 소속 정보 */}
          <div className="flex flex-row justify-between gap-2 mt-1">
            <div className="">한국공학대</div>
            <span className="h-[1.25rem] mt-[0.125rem] border-right border-[0.08rem] border-gray"></span>
            <div className="">4학년</div>
            <span className="h-[1.25rem] mt-[0.125rem] border-right border-[0.08rem] border-gray"></span>
            <div className="">8기</div>
          </div>
          {/** 포지션/경력 */}
          <div className="flex flex-row gap-2 mt-1">
            <PositionTag position={position} />
            <CareerTag career={career} />
          </div>
        </div>
      </div>
    </div>
  )
}
