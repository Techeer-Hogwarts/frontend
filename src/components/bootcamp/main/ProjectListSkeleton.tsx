import React from 'react'

const ProjectListSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
      <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-lightgray shadow-md animate-pulse" />
    </div>
  )
}

export default ProjectListSkeleton
