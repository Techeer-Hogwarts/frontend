'use client'

import AddBtn from './AddBtn'
import Carousel from './Carousel'
interface Team {
  id: number
  name: string
  mainImage: string
}

interface Experience {
  id?: number
  companyName: string
  startDate: string
  endDate: string | null
  position: string
  category: string
  isFinished: boolean
}

interface HomeProps {
  projectTeams?: Team[]
  studyTeams?: Team[]
  experiences?: Experience[]
}

// ISO 형식 날짜 문자열을 "YYYY-MM-DD" 형식으로 변환하는 함수
const convertDate = (rawDate: string): string => {
  if (!rawDate) return ''
  const date = new Date(rawDate)
  if (isNaN(date.getTime())) return ''
  return date.toISOString().substring(0, 10)
}

export default function Home({
  projectTeams = [],
  studyTeams = [],
  experiences = [],
}: HomeProps) {
  // 경력 데이터는 category를 기준으로 분리
  const internExperiences = experiences.filter((exp) => exp.category === '인턴')
  const fullTimeExperiences = experiences.filter(
    (exp) => exp.category === '정규직',
  )

  return (
    <div className="flex flex-col gap-6 w-[890px]">
      {/* 기술 스택 */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-black/70">기술 스택</h2>
        <div className="flex relative h-[140px] px-10 w-[890px] gap-3 overflow-x-auto items-center justify-center border border-lightgray rounded-lg">
          <span className="text-sm text-gray">추후 업데이트 예정입니다.</span>
        </div>
      </div>

      {/* 프로젝트 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">프로젝트</h2>
          <AddBtn title="+ 프로젝트 추가" href="/project/add/project" />
        </div>
        {projectTeams.length === 0 ? (
          <div className="flex relative h-[140px] px-10 w-[890px] gap-3 overflow-x-auto items-center justify-center border border-lightgray rounded-lg">
            <span className="text-sm text-gray">프로젝트가 없습니다.</span>
          </div>
        ) : (
          <Carousel teams={projectTeams} routePrefix="/project/detail/project" />
        )}
      </div>

      {/* 스터디 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">스터디</h2>
          <AddBtn title="+ 스터디 추가" href="/project/add/study" />
        </div>
        {studyTeams.length === 0 ? (
          <div className="flex relative h-[140px] px-10 w-[890px] gap-3 overflow-x-auto items-center justify-center border border-lightgray rounded-lg">
            <span className="text-sm text-gray">스터디가 없습니다.</span>
          </div>
        ) : (
          <Carousel teams={studyTeams} routePrefix="/project/detail/study" />
        )}
      </div>

      {/* 경력 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">경력</h2>
        </div>
        <div className="flex flex-col relative min-h-[140px] px-12 py-10 w-[890px] gap-3 overflow-x-auto border border-lightgray rounded-lg">
          {internExperiences.length === 0 &&
          fullTimeExperiences.length === 0 ? (
            <div className="flex justify-center items-center h-[100px]">
              <span className="text-sm text-gray">경력이 없습니다.</span>
            </div>
          ) : (
            <>
              {internExperiences.length > 0 && (
                <>
                  <h3 className="text-lg mb-3 text-black/70">인턴</h3>
                  {internExperiences.map((exp, index) => (
                    <div
                      key={exp.id ? `intern-${exp.id}` : `intern-${index}`}
                      className="my-2 text-black/70"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          {exp.companyName}
                        </span>
                        <span className="text-sm">
                          {convertDate(exp.startDate)} ~{' '}
                          {exp.endDate ? convertDate(exp.endDate) : '재직중'}
                        </span>
                      </div>
                      <div className="flex justify-start items-center">
                        <span className="text-sm text-gray">
                          {exp.position}
                        </span>
                      </div>
                      <div className="my-4 border-lightgray border-t-[1px]" />
                    </div>
                  ))}
                </>
              )}
              {fullTimeExperiences.length > 0 && (
                <>
                  <h3 className="text-lg mb-3 text-black/70">정규직</h3>
                  {fullTimeExperiences.map((exp, index) => (
                    <div
                      key={exp.id ? `fulltime-${exp.id}` : `fulltime-${index}`}
                      className="my-2 text-black/70"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          {exp.companyName}
                        </span>
                        <span className="text-sm">
                          {convertDate(exp.startDate)} ~{' '}
                          {exp.endDate ? convertDate(exp.endDate) : '재직중'}
                        </span>
                      </div>
                      <div className="flex justify-start items-center">
                        <span className="text-sm text-gray">
                          {exp.position}
                        </span>
                      </div>
                      <div className="my-4 border-lightgray border-t-[1px]" />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
