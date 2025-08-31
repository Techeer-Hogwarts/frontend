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
    <Link href={`/profile/${id}`}>
      {/* 탭 부분 */}
      <div className="flex items-end">
        <div className="relative w-[3rem] h-[1.25rem] bg-lightprimary flex items-center justify-center rounded-t-md shadow-cardtop">
          <span className="text-pink text-[0.75rem]">
            {year == 0 ? 'Leader' : `${year}기`}
          </span>
        </div>
        <div
          className="w-1 h-[0.95rem] bg-lightprimary"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        ></div>
      </div>

      <div className="flex flex-col p-[0.8rem] justify-center w-[18rem] h-[10.275rem] rounded-b-lg rounded-tr-lg shadow-card">
        <div className="flex w-full gap-2">
          <Image
            src={profileImage || '/profile.png'}
            alt="profile"
            width={80}
            height={80}
            className="w-[80px] h-[80px] object-cover rounded-md"
          />
          <div className="flex flex-col w-[10.9rem]">
            {/* <p className="text-[1.01688rem] font-normal">{mainPosition}</p> */}
            <div className="flex justify-between items-center gap-2 w-full">
              <p className="text-[1.1185rem] font-medium">{name}</p>
              <PositionTag position={mainPosition} />
            </div>
            <div className="flex items-center">
              <p className="text-[0.8135rem] text-darkgray">
                {/* &nbsp;|&nbsp; */}
                {school?.length > 10 ? `${school.substring(0, 10)}...` : school}
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

        <hr className="w-full my-[0.4rem] border-lightgray" />
        <div className="flex gap-2 h-[2.813rem]">
          {projectTeams && projectTeams.length > 0 ? (
            projectTeams
              .slice(0, 5)
              .map((team, idx) => (
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
            <p className="flex justify-center items-center text-gray text-[0.7rem] w-full">
              프로젝트를 등록하세요.
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
