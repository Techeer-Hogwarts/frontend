import Card from '@/components/project/Card'
import Section from './Section'

const ProjectSection = () => {
  const dummyData = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ]
  return (
    <Section id="project" title="프로젝트">
      <div className="grid grid-cols-4 gap-5">
        {dummyData.map((item) => (
          <Card key={item.id} />
        ))}
      </div>
    </Section>
  )
}

export default ProjectSection
