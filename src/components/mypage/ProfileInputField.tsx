interface ProfileInputFieldProps {
  readonly title: string
  readonly placeholder: string
  readonly value?: string
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileInputField({
  title,
  placeholder,
  value = '',
  onChange,
}: ProfileInputFieldProps) {
  return (
    <div className="flex items-center">
      <h3 className="text-lg w-[130px]">{title}</h3>
      <input
        type="text"
        placeholder={placeholder}
        value={value}               
        onChange={onChange}         
        className="w-[620px] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
      />
    </div>
  )
}
