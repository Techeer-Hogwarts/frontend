'use client'

import { useMemo } from 'react'
import CsDetailBox from './CsDetailBox'
import SubmittedDetailBox from './SubmittedDetailBox'
import { useTodayCsQuery } from '@/api/cs'

interface CSPageProps {
  id: string
}

export default function CSPage({ id }: CSPageProps) {
  const { data: todayCs } = useTodayCsQuery()

  // 답변 제출 여부만 확인
  const submitted = useMemo(() => {
    if (!todayCs) return false
    return todayCs.isAnswered
  }, [todayCs])

  return submitted ? <CsDetailBox id={id} /> : <CsDetailBox id={id} />
}
