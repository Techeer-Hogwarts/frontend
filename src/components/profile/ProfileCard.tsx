'use client'

const profileId = 1

import Image from 'next/image'
import Link from 'next/link'

interface ProfileCardProps {
  name: string
  university: string
  year: string
  profileImage: string
  role: string
  skills: string[]
  projects: string[]
  generation: string
}

export default function ProfileCard({
  name,
  university,
  year,
  profileImage,
  role,
  skills,
  projects,
  generation,
}: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${profileId}`}
      className="flex flex-col w-[17.50938rem] h-[12.375rem] bg-[url('/images/profile/profileLayout.png')] bg-cover "
    >
      <div className="font-medium w-[3rem] pt-1 text-center text-[0.71181rem]">
        {generation}기
      </div>

      <div className="flex items-start gap-[0.58rem] px-[0.64rem] pt-[0.64rem] pb-[0.4rem]">
        <Image
          src={profileImage}
          alt="profile"
          width={92}
          height={92}
          className="w-[92px] h-[92px] bg-lightpink rounded-md"
        />
        <div className="flex flex-col">
          <p className="text-[1.01688rem] font-normal">{role}</p>
          <div className="flex items-center">
            <p className="text-[1.1185rem] font-medium">{name} </p>
            <p className="text-[0.8135rem] text-[#5A5A5A]">
              &nbsp;|&nbsp;{university} {year}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 w-full h-[2.54rem]">
            {skills.map((skill, index) => (
              <div
                key={skill + index}
                className="bg-lightprimary  text-pink px-[0.4rem] rounded-[0.1rem] text-[0.75rem]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className=" w-[15.45rem] ml-[0.72rem] mb-[0.32rem] border-lightgray " />
      <div className="flex gap-2 px-[0.64rem]">
        {projects.map((project, index) => (
          <Image
            key={project}
            src={project}
            alt="Project"
            width={45}
            height={45}
            className="w-[45px] h-[45px] bg-lightpink rounded-md"
          />
        ))}
      </div>
    </Link>
  )
}
