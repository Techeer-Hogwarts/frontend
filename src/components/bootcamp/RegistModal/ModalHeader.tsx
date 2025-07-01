import React from 'react'

const ModalHeader = ({ mode, onClose }) => {
  return (
    <div className="flex flex-col gap-5">
      <header className="relative flex justify-end items-center w-full">
        <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
          {mode === 'edit' ? '프로젝트 수정' : '프로젝트 등록'}
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </header>
      <div className="border-lightgray border-t"></div>
    </div>
  )
}

export default ModalHeader
