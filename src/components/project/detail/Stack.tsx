'use client'
interface StackItem {
  id: number
  isMain: boolean
  stackId: number
  projectTeamId: number
  stack: {
    id: number
    name: string
    category: string
  }
}

export default function Stack({ stacks }: { stacks?: StackItem[] }) {
  if (!stacks || stacks.length === 0) {
    return null
  }

  // 카테고리별로 스택을 그룹화
  // 예: { FRONTEND: [{ name: "React.js", isMain: true }], BACKEND: [{ name: "Node.js", isMain: false }], ... }
  const categories = stacks.reduce<{
    [key: string]: { name: string; isMain: boolean }[]
  }>((acc, curr) => {
    const category = curr.stack.category
    const name = curr.stack.name
    const isMain = curr.isMain

    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push({ name, isMain })
    return acc
  }, {})

  const categoryEntries = Object.entries(categories) // [ [category, [{ name, isMain }...]], ...]

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">기술 스택</div>
      <div className="flex flex-col w-[52.5rem] p-4 rounded-2xl bg-filterbg gap-4">
        {categoryEntries.map(([category, stackItems], index) => (
          <div key={category}>
            <StackCategory
              title={convertCategoryName(category)}
              stack={stackItems}
            />
            {index < categoryEntries.length - 1 && (
              <div className="mt-4 border-lightgray border-t"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 카테고리명 변환
function convertCategoryName(category: string) {
  switch (category) {
    case 'FRONTEND':
      return 'Frontend'
    case 'BACKEND':
      return 'Backend'
    case 'DATABASE':
      return 'Database'
    case 'DEVOPS':
      return 'DevOps'
    case 'OTHER':
      return 'Others'
    default:
      return category
  }
}
interface BoxProps {
  text: string
  isMain: boolean
}
function Box({ text, isMain }: BoxProps) {
  return (
    <div
      className={`flex items-center justify-center px-4 rounded-md h-[1.6rem] text-[0.9375rem] text-pink
        ${isMain ? 'bg-primary/60' : 'bg-lightprimary'}
      `}
    >
      {text}
    </div>
  )
}
interface StackCategoryProps {
  title: string
  stack: { name: string; isMain: boolean }[]
}
function StackCategory({ title, stack }: StackCategoryProps) {
  return (
    <div className="flex gap-[1rem] items-center">
      <div className="text-darkPrimary w-[4.875rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2 w-[712px]">
        {stack.map((item) => (
          <Box key={item.name} text={item.name} isMain={item.isMain} />
        ))}
      </div>
    </div>
  )
}
