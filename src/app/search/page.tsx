'use client'

import CategoryTab from '@/components/search/CategoryTab'
import ProjectSection from '@/components/search/ProjectSection'
import BlogSection from '@/components/search/BlogSection'
import ResumeSection from '@/components/search/ResumeSection'
import SessionSection from '@/components/search/SessionSection'
import { useEffect, useState } from 'react'
import { getSearchList } from './api/getSearchList'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Search() {
  const router = useRouter()
  const { query, results } = router.query
  const parsedResults = results ? JSON.parse(results as string) : []

  // useEffect(() => {
  //   if (query) {
  //     const fetchData = async () => {
  //       try {
  //         const data = await getSearchList(query)
  //         setResults(data)
  //         console.log('검색 결과:', data)
  //       } catch (error) {
  //         console.error('Error fetching search results:', error)
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [query])

  return (
    <div className="py-10">
      {/* 검색 결과 헤더 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          검색어 <span className="text-primary">&apos;토크타카&apos;</span>에
          대한 전체 <span className="text-amber-400">&apos;10&apos;</span>개의
          결과를 찾았습니다.
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
      {results && (
        <div>
          {/* 결과를 출력하는 부분 */}
          <h2>검색 결과</h2>
          {query && <p>검색어: {query}</p>}
          <ul>
            {parsedResults.length > 0 ? (
              parsedResults.map(
                (
                  result: { title: string; description: string },
                  index: number,
                ) => (
                  <li key={index}>
                    <h3>{result.title}</h3>
                    <p>{result.description}</p>
                  </li>
                ),
              )
            ) : (
              <p>결과가 없습니다.</p>
            )}
          </ul>
        </div>
      )}
      {/* 각 섹션 */}
      <ProjectSection />
      <BlogSection />
      {/* <ResumeSection /> */}
      <SessionSection />
    </div>
  )
}
