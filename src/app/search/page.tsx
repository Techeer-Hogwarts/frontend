'use client'

import { useSearchParams } from 'next/navigation'
import Search from '@/components/search/Search'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  return <Search key={query} />
}
