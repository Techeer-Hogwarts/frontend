import Image from 'next/image'

interface CategoryTabProps {
  onScrollToSection: (sectionId: string) => void
}

const CategoryTab: React.FC<CategoryTabProps> = ({ onScrollToSection }) => {
  const categories = [
    { label: '프로젝트', id: 'project' },
    { label: '이력서', id: 'resume' },
    { label: '블로그', id: 'blog' },
    { label: '세션', id: 'session' },
  ]

  return (
    <div className="flex items-center border-4 border-lightgray h-12 py-4">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`#${category.id}`}
          className={`flex items-center justify-between w-[18.75rem] text-xl text-left px-12 ${category.id !== 'session' ? 'border-r-2 border-lightgray' : ''}`}
        >
          {category.label}
          <Image
            src="/images/arrow-outline.svg"
            alt="arrow"
            className="w-6"
            width={14}
            height={14}
          />
          {/* 가로 세로 수정바람 */}
        </a>
      ))}
    </div>
  )
}

export default CategoryTab
