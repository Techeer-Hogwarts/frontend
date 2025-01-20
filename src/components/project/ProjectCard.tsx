import Image from 'next/image'
import Link from 'next/link'

// 더미값
const projectId = 1

type Team = {
  name: string
  category: string
  isRecruited: string
  isFinished: string
  teamStack: string
  createdAt: string
}

export default function ProjectCard({ team }: { team: Team }) {
  console.log(team)

  return (
    <Link
      href={`/project/detail/study/1`}
      className="relative group bg-[url('/images/project/projectCard.png')] bg-cover w-[18rem] h-[11.375rem]"
    >
      <div className="text-pink w-[4.375rem] pt-2 text-[0.71181rem] text-center">
        프로젝트
      </div>
      <div className="flex items-center pt-[1rem] px-[0.75rem] gap-3 justify-center">
        {/* 이미지 */}
        <div className="min-w-[7.8125rem]">
          <Image
            src="/images/project/example.png"
            alt="프로젝트 이미지"
            width={125}
            height={125}
            className="rounded-md border bg-pink-300"
          />
        </div>
        <div>
          {/* 프로젝트 제목 */}
          <h2 className="font-bold text-[1.01688rem] gap-[2.44rem]">
            {team.name}
          </h2>

          {/* 모집 여부에 따른 조건부 렌더링 */}
          {team.isRecruited === 'True' ? (
            <>
              {/* 프로젝트 설명 */}
              <p className="text-[0.75rem] mb-[2.44rem]">
                아이들의 &quot;오늘 하루 있었던 일&quot;을 주제로 캐릭터와...
              </p>

              {/* 스택 카드 */}
              <div className="mt-4 flex justify-end gap-2">
                {['Next.js', 'Spring'].map((stack) => (
                  <div
                    key={stack}
                    className="bg-lightprimary text-pink py-[0.19rem] px-[0.5rem] rounded-lg text-sm"
                  >
                    {stack}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* 인원모집 */}
              <div className="mt-8 flex flex-col justify-end gap-2">
                {['Frontend : 1명', 'Backend : 1명'].map((stack) => (
                  <div
                    key={stack}
                    className="bg-lightblue text-blue py-[0.19rem] px-[0.8rem] rounded-lg text-sm"
                  >
                    {stack}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 호버 시 표시되는 부분 */}
      <div className="w-[17.3rem] h-[9.6rem] py-[3.25rem] px-[3rem] rounded-[0.63rem] absolute left-1 bottom-1 bg-black bg-opacity-75 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <p className="mt-2 text-sm">
            아이들의 &quot;오늘 하루 있었던 일&quot;을 주제로 캐릭터와
            음성채팅으로 대화를 나누며 하루를 돌아보고 기록해주는 서비스
          </p>
        </div>
      </div>
    </Link>
  )
}
