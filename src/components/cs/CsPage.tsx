'use client'

import CsDetailBox from './CsDetailBox'
import SubmittedDetailBox from './SubmittedDetailBox'
import { useCsPage } from '@/hooks/cs/useCsPage'

interface CSPageProps {
  id: string
}

export default function CSPage({ id }: CSPageProps) {
  const { submitted } = useCsPage({ id })

  return submitted ? <SubmittedDetailBox id={id} /> : <CsDetailBox id={id} />
}
