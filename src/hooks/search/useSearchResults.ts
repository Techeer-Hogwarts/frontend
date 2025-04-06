import { useEffect, useState } from 'react'
import { getSearchList } from '@/api/search/getSearchList'
import { SearchResults } from '@/types/search'

export function useSearchResults() {
  const [results, setResults] = useState<SearchResults>({
    project: [],
    study: [],
    blog: [],
    resume: [],
    session: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const queryParam = searchParams.get('query')
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [])

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
  }, [query])

  return { query, results, isLoading }
}
