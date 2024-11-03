import Card from '@/components/project/Card'
import Section from './Section'

const ProjectSection = () => {
  return (
    <Section id="project" title="프로젝트">
      <div className="grid grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </Section>
  )
}

export default ProjectSection
