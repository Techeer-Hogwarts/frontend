'use client'

import CategoryTab from '@/components/search/CategoryTab'
import ProjectSection from '@/components/search/ProjectSection'
import BlogSection from '@/components/search/BlogSection'
import ResumeSection from '@/components/search/ResumeSection'
import SessionSection from '@/components/search/SessionSection'
import { useEffect, useState } from 'react'
import { getSearchList } from '../api/getSearchList'
import { useSearchParams } from 'next/navigation'
import SkeletonCardItem from '@/components/search/SkeletonCard'
import EmptyLottie from '@/components/common/EmptyLottie'

export default function Search() {
  const [results, setResults] = useState<{
    project: any[]
    study: any[]
    blog: any[]
    resume: any[]
    session: any[]
  }>({
    project: [],
    study: [],
    blog: [],
    resume: [],
    session: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState<string>('')

  // const searchParams = useSearchParams()

  // URL에서 query 파라미터를 가져오는 useEffect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const queryParam = searchParams.get('query')
    if (queryParam) {
      setQuery(queryParam)
    }
  }, []) // searchParams가 바뀔 때마다 실행

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          setIsLoading(true) // 데이터 요청 전 로딩 시작
          const data = await getSearchList(query as string) // API 호출
          setResults({
            project: Array.isArray(data.result.project)
              ? data.result.project
              : [],
            study: Array.isArray(data.result.study) ? data.result.study : [],
            blog: Array.isArray(data.result.blog) ? data.result.blog : [],
            resume: Array.isArray(data.result.resume) ? data.result.resume : [],
            session: Array.isArray(data.result.session)
              ? data.result.session
              : [],
          })
        } catch (error) {
        } finally {
          setIsLoading(false) // 데이터 로딩 완료
        }
      }
      fetchData()
    }
  }, [query]) // query가 바뀔 때마다 호출

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
          <EmptyLottie
            text="검색한 데이터가 없습니다."
            text2="다시 검색해주세요"
          />
        </div>
      )}
    </div>
  )
}
