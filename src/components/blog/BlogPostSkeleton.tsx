'use client'

export default function BlogPostSkeleton() {
  return (
    <div className="flex flex-col w-full relative rounded-b-lg overflow-hidden bg-filterbg">
      <div className=" animate-pulse">
        {/* 이미지 자리 */}
        <div className="w-full h-[155px] bg-lightgray" />

        {/* 내용 영역 */}
        <div className="w-full min-h-[100px] py-2 bg-white flex flex-col gap-2 px-5">
          {/* 타이틀 자리 */}
          <div className="w-3/4 h-4 bg-lightgray rounded" />

          {/* 날짜 자리 */}
          <div className="w-1/2 h-3 bg-lightgray rounded" />

          {/* 아래쪽: 작성자 + 좋아요 */}
          <div className="flex justify-between items-center mt-3 bg-filterbg">
            {/* 작성자 */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-lightgray rounded-full" />
              <div className="w-16 h-4 bg-lightgray rounded" />
            </div>
            {/* 좋아요 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-lightgray rounded" />
              <div className="w-6 h-6 bg-lightgray rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
