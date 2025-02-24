export default function SkeletonProfileCard() {
  return (
    <div className="flex flex-wrap gap-5 animate-pulse">
      <div className="flex flex-col w-[17.50938rem] h-[12.375rem] bg-filterbg rounded-lg">
        <div className="flex items-start gap-[0.58rem] px-[0.64rem] pt-[0.64rem] pb-[0.4rem]">
          <div className="w-[92px] h-[92px] bg-lightgray rounded-md"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="w-[80%] h-[1rem] bg-lightgray rounded-md"></div>
            <div className="flex items-center gap-2">
              <div className="w-[50%] h-[1.25rem] bg-lightgray rounded-md"></div>
              <div className="w-[30%] h-[1rem] bg-lightgray rounded-md"></div>
            </div>
            <div className="w-[40%] h-[1.3rem] bg-lightgray rounded-md"></div>
          </div>
        </div>
        <div className="flex gap-2 px-[0.64rem]">
          <div className="w-[45px] h-[45px] bg-lightgray rounded-md"></div>
          <div className="w-[45px] h-[45px] bg-lightgray rounded-md"></div>
          <div className="w-[45px] h-[45px] bg-lightgray rounded-md"></div>
        </div>
      </div>
    </div>
  )
}
