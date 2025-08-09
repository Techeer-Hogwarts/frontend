import React, { forwardRef } from 'react'
import Image from 'next/image'

export interface InputFieldProps {
  label: string
  name: string
  placeholder: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean // 필수 여부 (*)
  showIcon?: boolean
  isChecked?: boolean
  disabled?: boolean
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      required = false,
      showIcon = false,
      isChecked = false,
      disabled = false,
      onChange,
      value,
    },
    ref,
  ) => {
    return (
      <div>
        <div className="flex justify-between mb-2.5">
          <label className="block text-lg">
            {label}
            {required && <span className="text-primary"> *</span>}
          </label>
          {showIcon && (
            <Image
              src={isChecked ? '/images/check-on.svg' : '/images/check-off.svg'}
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
          onChange={onChange}
          value={value}
          disabled={disabled}
          ref={ref} // forwardRef로 전달된 ref를 input에 연결
          className={`w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
      </div>
    )
  },
)

InputField.displayName = 'InputField' // 컴포넌트 이름 설정 (디버깅용)

export default InputField
