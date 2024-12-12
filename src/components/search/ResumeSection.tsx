'use client'

import { useState } from 'react'
import Section from './Section'
import ResumeFolder from '@/components/resume/ResumeFolder'

const ResumeSection = () => {
  const [selectedPosition, setSelectedPosition] = useState<string | undefined>(
    undefined,
  )
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined,
  )
  return (
    <Section id="resume" title="이력서">
      <ResumeFolder
        position={selectedPosition}
        year={selectedYear}
        offset={0}
        limit={10}
      />
    </Section>
  )
}

export default ResumeSection
