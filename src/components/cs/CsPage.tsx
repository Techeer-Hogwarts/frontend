'use client'

import { useMemo } from 'react'
import CsDetailBox from './CsDetailBox'
import SubmittedDetailBox from './SubmittedDetailBox'
import { useCsProblemDetailQuery } from '@/api/cs'

interface CSPageProps {
  id: string
}

export default function CSPage({ id }: CSPageProps) {
  const { data: problemDetail } = useCsProblemDetailQuery(Number(id))

  // answered 필드로 답변 제출 여부 확인
  const submitted = useMemo(() => {
    if (!problemDetail) return false
    return problemDetail.answered
  }, [problemDetail])

  return submitted ? <SubmittedDetailBox id={id} /> : <CsDetailBox id={id} />
}
