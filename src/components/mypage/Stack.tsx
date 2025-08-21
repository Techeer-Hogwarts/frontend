'use client'

import { TechStacks, StackItem } from '@/types/mypage/mypage.types'

interface StackProps {
  stacks?: TechStacks
}

// Stack component for mypage (without isMain field)
export default function Stack({ stacks }: StackProps) {
  console.log('Stack component received stacks:', stacks)
  
  // Ensure stacks is an object before proceeding
  if (!stacks || typeof stacks !== 'object') {
    console.log('Stacks is null or not an object')
    return null
  }

  // Convert the object structure to the format we need for rendering
  // Show all categories even if they have no items
  const categoryEntries = Object.entries(stacks)

  return (
    <div className="flex flex-col w-full p-4 rounded-2xl gap-4">
              {categoryEntries.map(([category, stackItems], index) => (
          <div key={category}>
            <StackCategory
              title={convertCategoryName(category.toUpperCase())}
              stack={stackItems || []}
            />
            {index < categoryEntries.length - 1 && (
              <div className="mt-4 border-lightgray border-t"></div>
            )}
          </div>
        ))}
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
}
function Box({ text }: BoxProps) {
  return (
    <div className="flex items-center justify-center px-4 rounded-md h-[1.6rem] text-[0.9375rem] text-pink bg-lightprimary">
      {text}
    </div>
  )
}

interface StackCategoryProps {
  title: string
  stack: StackItem[]
}
function StackCategory({ title, stack }: StackCategoryProps) {
  return (
    <div className="flex gap-[1rem] items-center">
      <div className="text-darkPrimary min-w-[4.875rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2 flex-1">
        {stack.length > 0 ? (
          stack.map((item) => (
            <Box key={item.id} text={item.name} />
          ))
        ) : (
          <span className="text-sm text-gray">기술 스택이 없습니다.</span>
        )}
      </div>
    </div>
  )
} 