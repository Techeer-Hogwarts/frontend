export default function SkeletonProjectCard() {
  return (
    <div className="relative group bg-filterbg w-[18rem] h-[11.375rem] rounded-lg animate-pulse">
      <div className="flex items-center pt-[1.5rem] px-[0.9rem] gap-3 justify-center">
        <div className="w-[7.8125rem] h-[7.8125rem] min-w-[7.8125rem] rounded-2xl bg-lightgray"></div>
        <div className="min-w-28 flex flex-col justify-between h-[125px]">
          <div className="w-[7rem] h-[1rem] bg-lightgray rounded-md mt-1"></div>
          <div className="flex flex-col gap-2">
            <div className="w-[7rem] h-[1.25rem] bg-lightgray rounded-md"></div>
            <div className="w-[7rem] h-[1.25rem] bg-lightgray rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="hidden"></div>
    </div>
  )
}
