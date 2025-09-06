'use client'

import CategoryTab from '@/components/search/CategoryTab'
import ProjectSection from '@/components/search/ProjectSection'
import BlogSection from '@/components/search/BlogSection'
import ResumeSection from '@/components/search/ResumeSection'
import SessionSection from '@/components/search/SessionSection'
import SkeletonCardItem from '@/components/search/SkeletonCard'
import EmptyAnimation from '@/components/common/EmptyAnimation'
import { useSearchResults } from '@/hooks/search/useSearchResults'

export default function Search() {
  const { query, results, isLoading } = useSearchResults()
  return (
    <div className="py-10">
      {/* 검색 결과 헤더 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          검색어 <span className="text-primary">&apos;{query}&apos;</span>에
          대한 전체
          <span className="text-amber-400">
            <span></span> &apos;
            {results.project.length +
              results.study.length +
              results.blog.length +
              results.resume.length +
              results.session.length}
            &apos;
          </span>
          개의 결과를 찾았습니다.
        </h2>
      </div>

      {/* 카테고리 탭 */}
      <CategoryTab
        onScrollToSection={(sectionId) => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      {/* 검색 결과 출력 */}
      {isLoading ? (
        // 데이터 로딩 중일 때는 Skeleton UI 표시
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCardItem key={i} />
          ))}
        </div>
      ) : results.project.length ||
        results.study.length ||
        results.blog.length ||
        results.resume.length ||
        results.session.length ? (
        <>
          <ProjectSection project={results.project} study={results.study} />
          <ResumeSection resumes={results.resume} />
          <BlogSection blog={results.blog} />
          <SessionSection session={results.session} />
        </>
      ) : (
        <div className="flex justify-center">
          <EmptyAnimation
            text="검색한 데이터가 없습니다."
            text2="다시 검색해주세요"
          />
        </div>
      )}
    </div>
  )
}
