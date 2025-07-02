import React from 'react'

const Loading = ({ mode }) => {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="mt-4 text-white text-lg font-semibold">
          {mode == 'edit' ? '프로젝트 수정 중...' : '프로젝트 등록 중...'}
        </span>
      </div>
    </div>
  )
}

export default Loading
