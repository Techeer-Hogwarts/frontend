import Image from 'next/image'
import Link from 'next/link'
import type { ProjectTeam } from '@/types/project/project'

export default function ProjectCard({ team }: { team: ProjectTeam }) {
  const mainImageUrl = team.mainImages[0]

  // 인원표시 제한을 위해 count 변수 사용
  let count = 0

  return (
    <Link
      href={`/project/detail/project/${team.id}`}
      className="inline-block group w-[18rem] h-[11.375rem] relative"
    >
      {/* 탭 부분 */}
      <div className="flex items-end">
        <div className="relative w-[4.5rem] h-[1.25rem] bg-lightprimary flex items-center justify-center rounded-t-md shadow-cardtop">
          <span className="text-pink text-[0.75rem]">프로젝트</span>
        </div>
        <div
          className="w-1 h-[0.95rem] bg-lightprimary"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        ></div>
      </div>

      {/* 폴더 본체 */}
      <div className="flex items-center p-[1rem] gap-3 justify-center w-full h-[10.125rem] rounded-b-lg rounded-tr-lg shadow-card">
        {/* 메인 이미지 */}
        <div className="w-[8.125rem] h-[8.125rem] rounded-2xl">
          <Image
            src={mainImageUrl}
            alt="프로젝트 메인 이미지"
            width={130}
            height={130}
            className="rounded-lg object-cover w-[8.125rem] h-[8.125rem]"
          />
        </div>

        <div className="w-[6.5rem] flex flex-col justify-between h-[125px]">
          {/* 프로젝트 이름 */}
          <div className="w-full truncate font-bold text-[1.01688rem]">
            {team.name}
          </div>

          <div className="flex">
            {/* 모집 중일 때 */}
            {team.isRecruited ? (
              <div className="flex flex-col justify-end gap-2 w-full">
                {team.frontendNum > 0 &&
                  count < 3 &&
                  (count++,
                  (
                    <div className="bg-lightblue text-blue py-[0.1rem] rounded-lg text-[13px] text-center">
                      Frontend : {team.frontendNum}명
                    </div>
                  ))}
                {team.backendNum > 0 &&
                  count < 3 &&
                  (count++,
                  (
                    <div className="bg-lightgreen text-green py-[0.1rem] rounded-lg text-[13px] text-center">
                      Backend : {team.backendNum}명
                    </div>
                  ))}
                {team.devopsNum > 0 &&
                  count < 3 &&
                  (count++,
                  (
                    <div className="bg-lightpink text-pink py-[0.1rem] rounded-lg text-[13px] text-center">
                      DevOps : {team.devopsNum}명
                    </div>
                  ))}
                {team.fullStackNum > 0 &&
                  count < 3 &&
                  (count++,
                  (
                    <div className="bg-lightyellow text-yellow py-[0.1rem] rounded-lg text-[13px] text-center">
                      FullStack : {team.fullStackNum}명
                    </div>
                  ))}
                {team.dataEngineerNum > 0 &&
                  count < 3 &&
                  (count++,
                  (
                    <div className="bg-lightpurple text-purple py-[0.1rem] rounded-lg text-[13px] text-center">
                      Data : {team.dataEngineerNum}명
                    </div>
                  ))}
              </div>
            ) : (
              // 모집 마감 시, 대표 스택 표시
              <div className="flex flex-col gap-1 h-[6.25rem] items-start justify-end">
                {team.teamStacks
                  .filter((stack) => stack.isMain)
                  .slice(0, 4)
                  .map((stack) => (
                    <div
                      key={stack.stackName}
                      className="bg-lightprimary text-pink py-[0.1rem] px-[0.3rem] rounded-md text-[13px] truncate max-w-[6.5rem]"
                    >
                      {stack.stackName}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ====== 오버레이 (hover 시 표시) ====== */}
      <div
        // 부모와 같은 크기/위치, 클릭 이벤트 막지 않도록 pointer-events-none
        className="pointer-events-none absolute top-0 left-0 w-[18rem] h-[11.375rem]
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {/* 탭 부분 (오버레이) */}
        <div className="flex items-end">
          <div className="relative w-[4.5rem] h-[1.25rem] bg-black/70 flex items-center justify-center rounded-t-md"></div>
          <div
            className="w-1 h-[0.95rem] bg-black/70"
            style={{
              clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
            }}
          />
        </div>

        {/* 폴더 본체 (오버레이) */}
        <div className="flex items-center p-[1rem] gap-3 justify-center w-full h-[10.125rem] rounded-b-lg rounded-tr-lg bg-black/70">
          {/* 오버레이 내용: 프로젝트 설명 등 */}
          <div className="text-white mx-4 text-sm line-clamp-4 text-center">
            {team.projectExplain || '설명이 없습니다'}
          </div>
        </div>
      </div>
    </Link>
  )
}
