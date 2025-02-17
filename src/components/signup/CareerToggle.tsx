import React from 'react'

interface CareerToggleProps {
  title: string
  value: string | null
  setValue: (value: string) => void
}

const CareerToggle: React.FC<CareerToggleProps> = ({
  title,
  value,
  setValue,
}) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-lg ">
        {title} <span className="text-primary"> *</span>
      </label>
      <div className="flex justify-between space-x-3 text-sm">
        <button
          type="button"
          onClick={() => setValue('yes')}
          className={`w-[6rem] h-10 border rounded-[0.25rem] ${
            value === 'yes'
              ? 'bg-primary text-white border-primary'
              : 'text-gray border-gray'
          }`}
        >
          있어요
        </button>
        <button
          type="button"
          onClick={() => setValue('no')}
          className={`w-[6rem] h-10 border rounded-[0.25rem] ${
            value === 'no'
              ? 'bg-primary text-white border-primary'
              : 'text-gray border-gray'
          }`}
        >
          없어요
        </button>
      </div>
    </div>
  )
}

export default CareerToggle
