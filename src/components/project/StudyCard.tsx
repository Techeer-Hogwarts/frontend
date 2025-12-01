import Link from 'next/link'
import type { StudyTeam } from '@/types/project/project'

export default function StudyCard({
  team,
  hideLabel = false,
}: {
  team: StudyTeam
  hideLabel?: boolean
}) {
  return (
    <Link
      href={`/project/detail/study/${team.id}`}
      className="inline-block group w-[18rem] h-[11.375rem] relative"
    >
      {!hideLabel && (
        <div className="flex items-end">
          <div className="relative w-[4.5rem] h-[1.25rem] bg-lightblue flex items-center justify-center rounded-t-md shadow-cardtop">
            <span className="text-blue text-[0.75rem]">스터디</span>
          </div>
          <div
            className="w-1 h-[0.95rem] bg-lightblue"
            style={{
              clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
            }}
          ></div>
        </div>
      )}

      <div className="flex items-center p-[1rem] gap-3 justify-center w-full h-[10.125rem] rounded-b-lg rounded-tr-lg shadow-card">
        <div className="flex w-[8.125rem] h-[8.125rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-lg text-white justify-center items-center text-center text-[1rem] font-medium">
          {team.name}
        </div>

        <div className="h-[7.8125rem] w-[104px] flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="w-full truncate font-bold text-[1.01688rem]">
              {team.name}
            </h2>
            <p className="text-[0.75rem] max-h-10 w-full h-10 truncate">
              {team.studyExplain}
            </p>
          </div>

          {team.recruited && (
            <div className="bg-lightblue py-[0.1rem] text-blue rounded-lg text-[13px] text-center">
              모집인원 : {team.recruitNum} 명
            </div>
          )}
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute top-0 left-0
          w-[18rem] h-[11.375rem]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      >
        {!hideLabel && (
          <div className="flex items-end">
            <div className="relative w-[4.5rem] h-[1.25rem] bg-black/70 flex items-center justify-center rounded-t-md" />
            <div
              className="w-1 h-[0.95rem] bg-black/70"
              style={{
                clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
              }}
            />
          </div>
        )}

        <div className="flex items-center p-[1rem] gap-3 justify-center w-full h-[10.125rem] rounded-b-lg rounded-tr-lg bg-black/70">
          <div className="text-white text-sm line-clamp-4 text-center">
            {team.studyExplain || '설명이 없습니다'}
          </div>
        </div>
      </div>
    </Link>
  )
}
