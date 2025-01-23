'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProfileProps {
  id: number
  userId: number
  name: string
  mainPosition: string
  profileImage: string
  school: string
  class: string
}

export default function ProfileCard({
  id,
  userId,
  name,
  mainPosition,
  profileImage,
  school,
  class: grade,
}: ProfileProps) {
  return (
    <div className="flex flex-wrap gap-5">
      <Link href={`/profile/${id}`}>
        <div
          // onClick={handleClick}
          className="flex flex-col w-[17.50938rem] h-[12.375rem] bg-[url('/images/profile/profileLayout.png')] bg-cover "
        >
          <div className="font-medium w-[3rem] pt-1 text-center text-[0.71181rem]">
            {/* {profile.year}기 */}기
          </div>

          <div className="flex items-start gap-[0.58rem] px-[0.64rem] pt-[0.64rem] pb-[0.4rem]">
            <Image
              src={profileImage}
              alt="profile"
              width={92}
              height={92}
              className="w-[5.75rem] h-[5.75rem] bg-lightgray rounded-md"
            />
            <div className="flex flex-col">
              <p className="text-[1.01688rem] font-normal">{mainPosition}</p>
              <div className="flex items-center">
                <p className="text-[1.1185rem] font-medium">{name}</p>
                <p className="text-[0.8135rem] text-[#5A5A5A]">
                  &nbsp;|&nbsp;
                  {school.length > 6 ? `${school.substring(0, 6)}...` : school}
                  {/* {class} */}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 w-full h-[1.3rem]">
                {/* {skills.map((skill, index) => ( */}
                <div
                  // key={`${skill}-${index}`}
                  className="bg-lightprimary text-pink px-[0.4rem] rounded-[0.3rem] text-[0.75rem]"
                >
                  {/* {profile.mainPosition} */}
                  {mainPosition}
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
          <hr className=" w-[15.45rem] ml-[0.72rem] mb-[0.32rem] border-lightgray " />
          <div className="flex gap-2 px-[0.64rem]">
            {/* {profiles.map((profile, index) => ( */}
            <Image
              // key={`${profile}-${index}`}
              // src={profile.profileImage}
              src={profileImage}
              alt="Project"
              width={45}
              height={45}
              className="w-[2.813rem] h-[2.813rem] bg-lightgray rounded-md"
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
