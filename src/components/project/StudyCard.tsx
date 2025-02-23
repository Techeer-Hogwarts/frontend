import Image from 'next/image'
import Link from 'next/link'

// 더미값
const projectId = 1

type Team = {
  id: number
  name: string
  isRecruited: boolean
  isFinished: boolean
  studyExplain: string
  recruitNum: number
}

export default function StudyCard({ team }: { team: Team }) {
  // console.log('study', team)

  const handleClick = () => {
    localStorage.setItem('projectType', 'study')
    localStorage.setItem('projectId', team.id.toString())
  }
  return (
    <Link
      href={`/project/detail/study/${team.id}`}
      onClick={handleClick}
      className="relative group bg-[url('/images/project/studyCard.png')] bg-cover w-[18rem] h-[11.375rem]"
    >
      <div className="text-blue w-[4.375rem] pl-1 pt-2 text-[0.71181rem] text-center">
        스터디
      </div>

      <div className="flex items-center pt-[1rem] px-[0.9rem] gap-3 justify-center">
        {/* 이미지 */}
        <div className="flex w-[7.8125rem] h-[7.8125rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-lg text-white justify-center text-center items-center text-[1rem] font-medium">
          {team.name}
        </div>

        <div className="h-[7.8125rem] w-[112px] flex flex-col justify-start ">
          {/* 프로젝트 제목 */}
          <h2 className="max-w-28 truncate font-bold text-[1.01688rem] gap-[2.44rem]">
            {team.name}
          </h2>
          <p className="text-[0.75rem] mt-1 max-w-28 max-h-10 w-28 h-10 truncate ">
            {team.studyExplain}
          </p>

          {team.isRecruited && (
            <div className="bg-lightblue mt-10 py-[0.19rem] px-[0.8rem]  text-blue rounded-lg text-[13px] text-center">
              모집인원 : {team.recruitNum} 명
            </div>
          )}
        </div>
      </div>

      {/* 호버 시 표시되는 부분 */}
      <div className="w-[17.3rem] h-[9.6rem] py-[3.25rem] px-[3rem] rounded-[0.63rem] absolute left-1 bottom-1 bg-black bg-opacity-75 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <p className="mt-2 text-sm">{team.studyExplain?team.studyExplain:'설명이 없습니다'}</p>
        </div>
      </div>
    </Link>
  )
}
