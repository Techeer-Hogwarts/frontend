export default function SkeletonCardItem() {
  return (
    <div className="w-[16.125rem] mt-10 animate-pulse">
      <div className="w-[258px] h-[136px] bg-gray rounded-lg mb-3"></div>
      <div className="h-6 bg-gray rounded-md mb-2 w-3/4"></div>
      <div className="h-3 bg-gray rounded-md mb-2 w-1/2"></div>
      <div className="h-5 bg-gray rounded-md w-1/4"></div>
      <div className="flex items-center mt-2">
        <div className="w-5 h-5 bg-gray rounded-full"></div>
        <div className="h-4 bg-gray rounded-md ml-2 w-16"></div>
      </div>
    </div>
  )
}
