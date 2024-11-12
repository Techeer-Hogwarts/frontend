import Section from './Section'
import ResumeFolder from '@/components/resume/ResumeFolder'

const resumes = [
  {
    name: '박명수',
    period: '8기',
    position: 'Frontend',
    career: '신입',
    date: '2024.09.21',
  },
  {
    name: '유재석',
    period: '7기',
    position: 'Backend',
    career: '경력',
    date: '2024.09.19',
  },
  {
    name: '정준하',
    period: '6기',
    position: 'DataEngineer',
    career: '신입',
    date: '2024.09.18',
  },
  {
    name: '정준하',
    period: '6기',
    position: 'DataEngineer',
    career: '신입',
    date: '2024.09.18',
  },
]

const ResumeSection = () => {
  return (
    <Section id="resume" title="이력서">
      <ResumeFolder resumes={resumes} />
    </Section>
  )
}

export default ResumeSection
