// 'use client'

// import { useState } from 'react'

// interface CategoryBtnProps {
//   title: string
// }

// export default function CategoryBtn({ title }: CategoryBtnProps) {
//   const [isClicked, setIsClicked] = useState(false)
//   return (
//     <button
//       type="button"
//       onClick={() => setIsClicked(!isClicked)}
//       className={`w-24 h-[34px] rounded-sm border text-sm ${isClicked ? 'text-primary border-primary ' : ' border-lightgray text-gray'}`}
//     >
//       {title}
//     </button>
//   )
// }

'use client'

import { useState } from 'react'

interface CategoryBtnProps {
  title: string
  onSelect: (category: string) => void // 부모에게 선택된 카테고리를 전달하는 콜백 함수
}

export default function CategoryBtn({ title, onSelect }: CategoryBtnProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
    onSelect(title) // 카테고리를 선택할 때 부모로 전달
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-24 h-[34px] rounded-sm border text-sm ${isClicked ? 'text-primary border-primary' : 'border-lightgray text-gray'}`}
    >
      {title}
    </button>
  )
}
