export default function SkeletonProjectCard() {
    return (
      <div className="relative group bg-lightgray w-[18rem] h-[11.375rem] rounded-lg animate-pulse">
        <div className="w-[4.375rem] pt-2 h-[1rem] bg-gray rounded-md mx-auto"></div>
        <div className="flex items-center pt-[1rem] px-[0.9rem] gap-3 justify-center">
          <div className="w-[7.8125rem] h-[7.8125rem] min-w-[7.8125rem] rounded-2xl bg-gray"></div>
          <div className="min-w-28 flex flex-col justify-between h-[125px]">
            <div className="w-[80%] h-[1rem] bg-gray rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="w-[7rem] h-[1.25rem] bg-gray rounded-md"></div>
              <div className="w-[7rem] h-[1.25rem] bg-gray rounded-md"></div>
              <div className="w-[7rem] h-[1.25rem] bg-gray rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="hidden"></div>
      </div>
    )
  }
  