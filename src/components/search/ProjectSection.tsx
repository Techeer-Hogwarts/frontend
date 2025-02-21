import Card from '@/components/project/Card'
import Section from './Section'
import CardItem from './CardItem'
import { useState } from 'react'

type ProjectProps = {
  id: string
  name: string
  title: string
  projectExplain: string
  teamStacks: string[]
  // userId: string
  // thumbnail: string
  // presenter: string
  // date: string
  // category: string
  // user: {
  //   name: string
  //   profileImage: string
  // }
}

const ProjectSection: React.FC<{ project: ProjectProps[] }> = ({ project }) => {
  const [showAll, setShowAll] = useState(false)

  // 처음에는 8개만 보여주고, 더보기 클릭 시 전체 데이터 보여주기
  const visibleProjects = showAll ? project : project.slice(0, 8)

  return (
    <Section id="project" title="프로젝트">
      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {visibleProjects.map((project) => (
            // <CardItem
            //   key={item.id}
            //   title={item.title}
            //   date={item.id}
            //   category=""
            //   author={item.name}
            //   authorImage=""
            //   thumbnail=""
            <Card key={project.id} project={project}></Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-darkgray">검색 결과가 없습니다</p>
      )}
      {/* 더보기 버튼 표시 */}
      {!showAll && project.length > 8 && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            더보기 +
          </button>
        </div>
      )}
      <div className="w-[62.5rem] h-[1px] mt-10 bg-lightgray"></div>
    </Section>
  )
}

export default ProjectSection
