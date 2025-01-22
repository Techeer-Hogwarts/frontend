const stacks = [
  {
    id: 24,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: true,
    stackId: 2,
    projectTeamId: 14,
    stack: {
      id: 2,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'React.js',
      category: 'FRONTEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
  {
    id: 25,
    createdAt: '2025-01-22T06:29:33.220Z',
    updatedAt: '2025-01-22T06:29:33.220Z',
    isDeleted: false,
    isMain: false,
    stackId: 50,
    projectTeamId: 14,
    stack: {
      id: 50,
      createdAt: '2025-01-20T09:44:45.712Z',
      updatedAt: '2025-01-20T09:44:45.712Z',
      isDeleted: false,
      name: 'Node.js',
      category: 'BACKEND',
    },
  },
]

// stacks 데이터를 기반으로 카테고리별로 그룹화 및 렌더링
export default function Stack() {
  // export default function Stack(stacks) {

  // 카테고리별로 스택을 그룹화
  const categories = stacks.reduce<{ [key: string]: string[] }>((acc, curr) => {
    const category = curr.stack.category
    const name = curr.stack.name

    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(name)

    return acc
  }, {})

  const categoryEntries = Object.entries(categories)
console.log(categoryEntries);

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">기술 스택</div>
      <div className="flex flex-col w-[52.5rem] p-4 rounded-2xl bg-filterbg gap-4">
        {categoryEntries.map(([category, stackNames], index) => (
          <div>
            <StackCategory
              key={category}
              title={convertCategoryName(category)}
              stack={stackNames}
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

// 카테고리 이름을 변환
const convertCategoryName = (category: string) => {
  switch (category) {
    case 'FRONTEND':
      return 'Frontend'
    case 'BACKEND':
      return 'Backend'
    case 'DEVOPS':
      return 'DevOps'
    case 'OTHER':
      return 'Others'
    default:
      return 'Unknown'
  }
}

interface BoxProps {
  text: string
}

const Box = ({ text }: BoxProps) => {
  return (
    <div className="flex items-center justify-center bg-lightprimary px-4 rounded-md h-[1.6rem] text-pink text-[0.9375rem]">
      {text}
    </div>
  )
}

interface StackCategoryProps {
  title: string
  stack: string[]
}

const StackCategory = ({ title, stack }: StackCategoryProps) => {
  return (
    <div className="flex gap-[1rem] items-center">
      <div className="text-darkPrimary w-[4.76319rem] text-lg font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <Box key={tech} text={tech} />
        ))}
      </div>
    </div>
  )
}
