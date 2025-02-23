export default function Skeleton() {
  return (
    <div className="flex justify-between w-[1200px] h-[800px] mt-10">
      {/** 좌측 영역 */}
      <div className="flex flex-col w-[15rem] gap-6">
        {/**  프로필 박스  **/}
        <div className="flex w-[19rem] h-[23rem]">
          {/* Folder 이미지 Placeholder */}
          <div className="relative z-0">
            <div className="w-[233px] h-[364px] bg-white shadow-xl rounded-xl" />

            <div className="absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
              {/* 프로필 사진 Placeholder */}
              <div className="flex w-[11rem] h-[11rem] bg-lightgray rounded-xl" />

              {/* 이름 및 아이콘 Placeholder */}
              <div className="flex flex-row justify-between mt-1">
                <div className="w-24 h-6 bg-lightgray rounded-md" />
                <div className="flex flex-row gap-2">
                  <div className="w-5 h-5 bg-lightgray rounded-full" />
                  <div className="w-5 h-5  bg-lightgray rounded-full" />
                  <div className="w-5 h-5 bg-lightgray rounded-full" />
                </div>
              </div>

              {/* 이메일 Placeholder */}
              <div className="w-32 h-4 bg-lightgray rounded-md" />

              {/* 소속 정보 Placeholder */}
              <div className="flex flex-row justify-between w-15 h-4 rounded-md gap-2 mt-1 bg-lightgray"></div>

              {/* 포지션/경력 Placeholder */}
              <div className="flex flex-row gap-2 mt-1">
                <div className="w-20 h-6 bg-lightgray rounded-md" />
                <div className="w-16 h-6 bg-lightgray rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/** 이력서 리스트 **/}
        <div className="flex flex-col justify-between gap-2 mt-1">
          <div className="w-[14.25rem] h-[2rem] bg-lightgray rounded-xl" />
          <div className="w-[14.25rem] h-[2rem] bg-lightgray rounded-xl" />
          <div className="w-[14.25rem] h-[2rem] bg-lightgray rounded-xl" />
        </div>
      </div>

      {/** 우측 영역 */}
      <div className="flex flex-col w-[55rem] h-[50rem] gap-5 rounded-xl">
        {/** pdf 이력서 Placeholder */}
        <div className="flex w-[50rem] h-[11rem] bg-lightgray rounded-xl" />
        <div className="flex w-[50rem] h-[11rem] bg-lightgray rounded-xl" />
        <div className="flex w-[50rem] h-[11rem] bg-lightgray rounded-xl" />
        <div className="flex w-[50rem] h-[11rem] bg-lightgray rounded-xl" />
      </div>
    </div>
  )
}
