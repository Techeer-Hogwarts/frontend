'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchResult = () => {
  const searchParams = useSearchParams()
  const [params, setParams] = useState<string | null>(null)

  useEffect(() => {
    const paramValue = searchParams.get('Param')
    setParams(paramValue)
  }, [searchParams])

  return <div>{params ? <p>My Param: {params}</p> : <p>No param found</p>}</div>
}

export default SearchResult
