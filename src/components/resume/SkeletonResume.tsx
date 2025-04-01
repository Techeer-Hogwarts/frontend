export default function SkeletonResumeFolder() {
  const arr = Array(3).fill(1)

  return (
    <div className="flex gap-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="flex flex-wrap gap-12 animate-pulse" key={i}>
          <div className="flex flex-col w-[16.5em] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-lightgray shadow-lg animate-pulse">
            <div className="flex justify-between mt-3 mx-1">
              <div className="w-24 h-6 bg-gray rounded"></div>
              <div className="w-10 h-6 bg-gray rounded"></div>
            </div>
            <div className="w-full h-[1px] bg-gray"></div>
            <div className="flex flex-row gap-2 mt-2">
              <div className="w-16 h-6 bg-gray rounded"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-20 h-4 bg-gray rounded"></div>
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-gray rounded"></div>
                <div className="w-5 h-5 bg-gray rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
