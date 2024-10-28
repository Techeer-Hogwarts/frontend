'use client'

import Image from 'next/image'
import CategoryBtn from './CategoryBtn'
import SessionDropdown from './SessionDropdown'

interface ModalProps {
  modal: string
  onClose: () => void
}

export default function AddSessionModal({ modal, onClose }: ModalProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/50 fixed inset-0">
      <div className="w-[486px] h-[740px] flex flex-col items-center items-cente bg-white rounded-lg">
        <div>
          <p className="text-2xl text-center mt-9 mb-3 font-semibold">
            세션 영상 등록
          </p>
          <Image
            src="/thumbnail.png"
            alt="thumbnail"
            width={220}
            height={150}
          />
        </div>
        <div className="flex flex-col relative mx-8 mt-8">
          <p>
            세션 제목을 입력해주세요 <span className="text-primary">*</span>
          </p>
          <input
            type="text"
            placeholder="세션 제목"
            className="w-[420px] pl-2 text-sm mt-1 mb-3 outline-none h-[34px] border border-lightgray"
          />
          <p>
            발표자를 입력해주세요 <span className="text-primary">*</span>
          </p>
          <input
            type="text"
            placeholder="발표자"
            className="w-[420px] pl-2 text-sm mt-1 mb-3 outline-none h-[34px] border border-lightgray"
          />
          <div className="relative flex justify-between mt-1 mb-3 items-start">
            <span>
              기간을 입력해주세요 <span className="text-primary">*</span>
            </span>
            {modal === '1' && (
              <SessionDropdown
                options={['1기', '2기', '3기', '4기', '5기', '6기']}
              />
            )}
            {modal === '2' && (
              <SessionDropdown
                options={[
                  '2022년 여름',
                  '2022년 겨울',
                  '2023년 여름',
                  '2023년 겨울',
                  '2024년 여름',
                ]}
              />
            )}
          </div>
          <p>
            카테고리를 선택해주세요 <span className="text-primary">*</span>
          </p>
          <div className="flex gap-3 mt-1 mb-3">
            <CategoryBtn title="Frontend" />
            <CategoryBtn title="Backend" />
            <CategoryBtn title="DevOps" />
            <CategoryBtn title="Others" />
          </div>
          <p>
            영상을 첨부해 주세요 <span className="text-primary">*</span>
          </p>
          <div className="flex gap-2 mt-1 mb-3">
            <input
              type="text"
              placeholder="+ 영상 업로드"
              className="w-[330px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
            />
            <button
              type="button"
              className="w-[77px] text-gray text-sm h-[34px] border border-lightgray"
            >
              + 첨부
            </button>
          </div>
          <p>발표 자료를 첨부해주세요</p>
          <div className="flex gap-2 mt-1 mb-3">
            <input
              type="text"
              placeholder="+ 발표 자료 업로드"
              className="w-[330px] pl-2 text-sm outline-none h-[34px] border border-lightgray"
            />
            <button
              type="button"
              className="w-[77px] text-gray text-sm h-[34px] border border-lightgray"
            >
              + 첨부
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
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
