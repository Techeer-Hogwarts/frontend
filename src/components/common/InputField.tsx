import React from 'react'
import Image from 'next/image'

export interface InputFieldProps {
  label: string
  name: string
  placeholder: string
  type?: string
  showIcon?: boolean
  required?: boolean // 필수 여부 (*)
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  showIcon = false,
  required = false,
}) => {
  return (
    <div>
      <div className="flex justify-between mb-2.5">
        <label className="block text-lg">
          {label}
          {required && <span className="text-primary"> *</span>}
        </label>
        {showIcon && (
          <Image
            src="/images/check-off.svg"
            alt="check"
            width={20}
            height={20}
          />
        )}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
      />
    </div>
  )
}

export default InputField
