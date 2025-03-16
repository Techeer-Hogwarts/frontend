import React from 'react'
import Image from 'next/image'

export interface InputFieldProps {
  label: string
  name: string
  placeholder: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean // 필수 여부 (*)

  /**
   * showIcon이 true일 때, 체크 아이콘을 표시할지 여부
   * true -> check-on.svg / false -> check-off.svg
   */
  showIcon?: boolean
  isChecked?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  showIcon = false,
  isChecked = false,
  onChange,
  onKeyDown,
  value,
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
        onKeyDown={onKeyDown}
        value={value}
        className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
      />
    </div>
  )
}

export default InputField
