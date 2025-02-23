import Image from 'next/image'
import Link from 'next/link'
import PositionTag from '../common/PositionTag'

interface ProjectTeam {
  mainImage: string
}

interface ProfileProps {
  id: number
  profileImage: string
  name: string
  school: string
  grade: string
  mainPosition: string
  year: number
  stack: string[]
  projectTeams: ProjectTeam[]
}

export default function ProfileCard({
  id,
  profileImage,
  name,
  school,
  grade,
  mainPosition,
  year,
  stack = [],
  projectTeams,
}: ProfileProps) {
  return (
    <div className="flex flex-wrap gap-5">
      <Link href={`/profile/${id}`}>
        <div
          // onClick={handleClick}
          className="flex flex-col w-[17.50938rem] h-[12.375rem] bg-[url('/images/profile/profileLayout.png')] bg-cover "
        >
          <div className="font-medium w-[3rem] pt-1 text-center text-[0.71181rem]">
            {year}기
          </div>

          <div className="flex items-start gap-[0.58rem] px-[0.64rem] pt-[0.64rem] pb-[0.4rem]">
            {profileImage && (
              <Image
                src={profileImage}
                alt="profile"
                width={92}
                height={92}
                className="w-[5.75rem] h-[5.75rem] bg-lightgray rounded-md object-cover"
              />
            )}
            <div className="flex flex-col">
              {/* <p className="text-[1.01688rem] font-normal">{mainPosition}</p> */}
              <div className="flex justify-between items-center gap-2 w-[148px]">
                <p className="text-[1.1185rem] font-medium">{name}</p>
                <PositionTag position={mainPosition} />
              </div>
              <div className="flex items-center">
                <p className="text-[0.8135rem] text-darkgray">
                  {/* &nbsp;|&nbsp; */}
                  {school.length > 10
                    ? `${school.substring(0, 10)}...`
                    : school}
                  &nbsp;| {grade}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 w-full h-[1.3rem]">
                {stack?.length > 0 &&
                  stack.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="bg-lightprimary text-pink px-[0.4rem] rounded-[0.3rem] text-[0.75rem]"
                    >
                      {skill}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <hr className=" w-[15.45rem] ml-[0.72rem] mb-[0.32rem] border-lightgray " />
          <div className="flex gap-2 px-[0.64rem]">
            {projectTeams && projectTeams.length > 0 ? (
              projectTeams.map((team, idx) => (
                <Image
                  key={idx}
                  src={team.mainImage}
                  alt={`Project #${idx + 1}`}
                  width={45}
                  height={45}
                  className="w-[2.813rem] h-[2.813rem] bg-lightgray rounded-md object-cover"
                />
              ))
            ) : (
              <p className="flex justify-center items-center text-gray text-[0.7rem] mt-[0.938rem] ml-[4.688rem]">
                프로젝트를 등록하세요.
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
