export default function ProjectDetailSkeleton() {
  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.313rem]">
      {/* 왼쪽 영역 */}
      <div
        className="flex flex-col items-center w-[19.1875rem] h-[30.29606rem]
                 bg-filterbg animate-pulse rounded-md"
      >
        <div className="w-full h-[1.4rem] mt-2 mb-[1.56rem] bg-filterbg" />
        {/* 메인 이미지 자리 */}
        <div className="w-[254px] h-[254px] bg-lightgray rounded-2xl" />

        {/* 프로젝트 이름 + 링크 아이콘 영역 */}
        <div className="flex w-[15.875rem] justify-between items-center mt-4 mb-4">
          <div className="w-[60%] h-6 bg-lightgray" />
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-lightgray rounded" />
            <div className="w-5 h-5 bg-lightgray rounded" />
          </div>
        </div>

        {/* 설명 영역 */}
        <div className="w-[15.875rem] h-[3rem] bg-lightgray rounded" />
      </div>

      {/* 오른쪽 영역 */}
        <div className="w-[840px] h-[800px] bg-lightgray animate-pulse rounded" />
    </div>
  )
}
