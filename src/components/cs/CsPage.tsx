'use client'

import { useMemo } from 'react'
import CsDetailBox from './CsDetailBox'
import SubmittedDetailBox from './SubmittedDetailBox'

interface CSPageProps {
  id: string
}

// 프론트 예시용 제출 여부 (추후 백엔드 연동 시 대체)
const submittedMap: Record<string, boolean> = {
  '1': true,
  '2': false,
  '3': false,
  '4': false,
}

export default function CSPage({ id }: CSPageProps) {
  const submitted = useMemo(() => submittedMap[id] ?? false, [id])
  return submitted ? <SubmittedDetailBox id={id} /> : <CsDetailBox id={id} />
}
