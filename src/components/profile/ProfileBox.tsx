import FolderSVG from '../../../public/folder.svg'
import GitSVG from '../../../public/git.svg'
import BlogSVG from '../../../public/blog.svg'
import PositionTag from '@/components/common/PositionTag'
import CareerTag from '@/components/common/CareerTag'

interface Profile {
  position: string
  career: string
}

export default function ProfileBox({ position, career }: Profile) {
  return (
    <div className="realtive flex w-[19rem] h-[23rem]">
      {/* Folder 이미지 */}
      <div className="relative z-0">
        <FolderSVG />
      </div>
      <div className="absolute z-10 flex flex-col top-[5%] left-[2%] w-[11rem] gap-1">
        {/** 프로필 사진 */}
        <div className="flex w-[11rem] h-[11rem] bg-gray-200 rounded-xl"></div>
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
          <span className="border-right border-[0.1rem]"></span>
          <div className="">4학년</div>
          <span className="border-right border-[0.1rem]"></span>
          <div className="">8기</div>
        </div>
        {/** 포지션/경력 */}
        <div className="flex flex-row gap-2 mt-1">
          <PositionTag position={position} />
          <CareerTag career={career} />
        </div>
      </div>
    </div>
  )
}
