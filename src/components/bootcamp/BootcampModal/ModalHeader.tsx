import React from 'react'
import FixIcon from '@/../public/images/Fixicon.svg'

const ModalHeader = ({ ProjectDetail, setIsEditing, onClose }) => {
  return (
    <header className="relative flex justify-end items-center w-full">
      <div className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
        {ProjectDetail.name}
      </div>
      <div className="flex flex-row gap-3">
        <button onClick={() => setIsEditing(true)}>
          <FixIcon />
        </button>
        <button onClick={onClose} className="text-2xl">
          ×
        </button>
      </div>
    </header>
  )
}

export default ModalHeader
