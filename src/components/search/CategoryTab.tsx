interface CategoryTabProps {
  onScrollToSection: (sectionId: string) => void
}

const CategoryTab: React.FC<CategoryTabProps> = ({ onScrollToSection }) => {
  const categories = [
    { label: '프로젝트', id: 'project' },
    { label: '블로그', id: 'blog' },
    { label: '이력서', id: 'resume' },
    { label: '세션', id: 'session' },
  ]

  return (
    <div className="flex items-center border-4 border-lightgray h-16 py-4">
      {categories.map((category, index) => (
        <a
          key={index}
          href={`#${category.id}`}
          className={`flex items-center justify-between w-[18.75rem] text-xl text-left px-12 ${index < categories.length - 1 ? 'border-r-2 border-lightgray' : ''}`}
        >
          {category.label}
          <img src="/images/arrow-outline.svg" alt="arrow" className="w-6" />
        </a>
      ))}
    </div>
  )
}

export default CategoryTab
