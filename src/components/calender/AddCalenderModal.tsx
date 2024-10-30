import Image from 'next/image'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { IoIosLink } from 'react-icons/io'
import CategoryBtn from './CategoryBtn'

export default function AddCalenderModal() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] h-[576px] flex flex-col items-center items-cente bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-7 mb-1 font-semibold">
            일정 추가
          </p>
          <Image
            src="/images/calendericon.png"
            alt="calender"
            width={100}
            height={100}
          />
        </div>
        <div className="relative mx-9 mt-5">
          <p>
            카테고리를 선택해주세요.<span className="text-primary">*</span>
          </p>
          <div className="flex mt-1">
            <CategoryBtn title="행사" />
            <CategoryBtn title="컨퍼런스" />
            <CategoryBtn title="취업공고" />
          </div>
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            제목을 입력해주세요.<span className="text-primary">*</span>
          </p>
          <input
            type="text"
            className="w-[416px] pl-2 text-sm mt-1 outline-none h-[34px] border border-lightgray"
          />
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            날짜를 입력해주세요.<span className="text-primary">*</span>
          </p>
          <div className="flex relative">
            <div className="relative mt-1">
              <input
                type="text"
                className="w-[208px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
              />
              <MdOutlineCalendarMonth className="absolute top-[5px] right-1 w-6 h-6 text-lightgray" />
            </div>
            <div className="relative mt-1">
              <input
                type="text"
                className="w-[208px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
              />
              <MdOutlineCalendarMonth className="absolute top-1 right-[5px] w-6 h-6 text-lightgray" />
            </div>
          </div>
        </div>
        <div className="relative mx-9 mt-4">
          <p>
            링크를 입력해주세요.<span className="text-primary">*</span>
          </p>
          <div className="relative">
            <input
              type="text"
              className="w-[416px] pl-2 text-sm mt-1 mb-6 outline-none h-[34px] border border-lightgray"
            />
            <IoIosLink className="absolute top-2 right-[5px] w-6 h-6 text-lightgray" />
          </div>
        </div>

        <div className="flex gap-4 mt-1">
          <button
            type="submit"
            // onClick={handleBack}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray "
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[200px] rounded-md text-sm h-[34px] bg-primary text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
