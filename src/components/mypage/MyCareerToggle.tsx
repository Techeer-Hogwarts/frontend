import React from 'react'

interface CareerToggleProps {
  title: string
  value: string | null
  setValue: (value: string) => void
}

const MyCareerToggle: React.FC<CareerToggleProps> = ({
  title,
  value,
  setValue,
}) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-lg text-black">{title}</label>
      <div className="flex justify-between space-x-1 text-sm">
        <button
          type="button"
          onClick={() => setValue('yes')}
          className={`w-[90px] h-10 border rounded-md ${
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
          className={`w-[90px] h-10 border rounded-md ${
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

export default MyCareerToggle
