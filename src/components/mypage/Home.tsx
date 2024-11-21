import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-6">
      {/* 기술 스택 */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-black/70">기술 스택</h2>
        <div className="w-[890px] h-[165px] border border-lightgray rounded-lg" />
      </div>

      {/* 프로젝트 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">프로젝트</h2>
          <button className="flex items-center justify-center  p-2 h-8 w-[130px] border border-lightgray text-black/70 rounded-lg">
            + 프로젝트 추가
          </button>
        </div>
        <div className="flex relative h-[140px] px-8 w-[890px] gap-3 overflow-x-auto items-center justify-start border border-lightgray rounded-lg">
          <HiMiniChevronLeft className="w-10 h-8 absolute left-0 top-[52px] text-black/20" />
          <Image
            src="/images/project/example.png"
            alt="thumbnail"
            width={64}
            height={64}
          />
          <Image
            src="/images/project/example.png"
            alt="thumbnail"
            width={64}
            height={64}
          />
          <HiMiniChevronRight className="w-10 h-8 absolute right-0 top-[52px] text-black/20" />
        </div>
      </div>

      {/* 스터디 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">스터디</h2>
          <button className="flex items-center justify-center p-2 h-8 w-[130px] border border-lightgray text-black/70 rounded-lg">
            + 스터디 추가
          </button>
        </div>
        <div className="flex relative h-[140px] px-8 w-[890px] gap-3 overflow-x-auto items-center justify-start border border-lightgray rounded-lg">
          <HiMiniChevronLeft className="w-10 h-8 absolute left-0 top-[52px] text-black/20" />
          <Image
            src="/images/project/example.png"
            alt="thumbnail"
            width={64}
            height={64}
          />
          <Image
            src="/images/project/example.png"
            alt="thumbnail"
            width={64}
            height={64}
          />
          <HiMiniChevronRight className="w-10 h-8 absolute right-0 top-[52px] text-black/20" />
        </div>
      </div>

      {/* 경력 */}
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2 text-black/70">경력</h2>
          <button className="flex items-center justify-center p-2 h-8 w-[130px] border border-lightgray text-black/70 rounded-lg">
            + 경력 추가
          </button>
        </div>
        <div className="flex flex-col relative min-h-[140px] px-12 py-10 w-[890px] gap-3 overflow-x-auto border border-lightgray rounded-lg">
          <h3 className="text-lg mb-3 text-black/70">인턴</h3>
          <div className="my-2 text-black/70">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">네이버 웹툰</span>
              <span className="text-sm">YYYY.MM - YYYY.MM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">프론트엔드 엔지니어</span>
              <label>
                <input type="checkbox" /> 재직중
              </label>
            </div>
            <div className="my-4 border-lightgray border-t-[1px]" />
          </div>

          <h3 className="text-lg text-black/70">정규직</h3>
          <div className="my-2 text-black/70">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">네이버 웹툰</span>
              <span className="text-sm">YYYY.MM - YYYY.MM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="">프론트엔드 엔지니어</span>
              <label>
                <input type="checkbox" /> 재직중
              </label>
            </div>
            <div className="my-4 border-lightgray border-t-[1px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
