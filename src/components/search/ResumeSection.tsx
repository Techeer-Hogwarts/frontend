'use client'

import { useState } from 'react'
import Section from './Section'
import ResumeFolder from '@/components/search/ResumeFolder'
import { Resume } from '@/types/search'

type ResumeProps = {
  resumes: Resume[]
}

const ResumeSection: React.FC<ResumeProps> = ({ resumes }) => {
  const [showAll, setShowAll] = useState(false)

  // 처음에는 8개만 보여주고, 더보기 클릭 시 전체 데이터 보여주기
  const visibleResumes = showAll ? resumes : resumes.slice(0, 8)

  return (
    <Section id="resume" title="이력서">
      {visibleResumes.length > 0 ? (
        <div className="flex flex-wrap gap-12">
          {visibleResumes.map((resume) => (
            <ResumeFolder key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <p className="text-center text-darkgray">검색 결과가 없습니다</p>
      )}
      {/* 더보기 버튼 표시 */}
      {!showAll && resumes.length > 8 && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            더보기 +
          </button>
        </div>
      )}
      <div className="w-[77rem] h-[1px] mt-10 bg-lightgray"></div>
    </Section>
  )
}

export default ResumeSection
