// 기존 Props
import { ChangeHandler, RefCallBack } from 'react-hook-form'

interface ModalInputFieldProps {
  title: string
  placeholder: string
  essential?: string
  disabled?: boolean
  registerProps: any
}

export default function ModalInputField({
  title,
  placeholder,
  essential,
  disabled,
  registerProps,
}: ModalInputFieldProps) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={registerProps.name} className="text-sm">
        {title}
        {essential && <span className="text-primary ml-1">{essential}</span>}
      </label>
      <input
        id={registerProps.name}
        placeholder={placeholder}
        disabled={disabled}
        {...registerProps}
        className="w-[420px] pl-2 text-sm mt-1 outline-none h-[34px] border border-lightgray rounded-sm"
      />
    </div>
  )
}
