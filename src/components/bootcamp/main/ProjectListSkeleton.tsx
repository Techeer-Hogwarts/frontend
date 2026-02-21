import React from 'react'

const ProjectListSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-lightgray shadow-lg animate-pulse"
        >
          {/* 기수 배지 플레이스홀더 */}
          <div className="absolute top-4 left-4 w-14 h-6 bg-gray-200/40 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default ProjectListSkeleton
