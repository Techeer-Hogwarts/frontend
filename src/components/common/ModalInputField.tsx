interface ModalInputFieldProps {
  title: string
  name?: string
  placeholder: string
  essential?: string
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  registerProps?: any
}

export default function ModalInputField({
  title,
  name,
  placeholder,
  essential,
  disabled,
  registerProps,
  value,
  onChange,
}: ModalInputFieldProps) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="text-sm">
        {title}
        {essential && <span className="text-primary ml-1">{essential}</span>}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...(registerProps ?? { value, onChange })}
        className="w-[420px] pl-2 text-sm mt-1 outline-none h-[34px] border border-lightgray rounded-sm"
      />
    </div>
  )
}
