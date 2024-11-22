interface ProfileInputFieldProps {
  readonly title: string
  readonly placeholder: string
}

export default function ProfileInputField({
  title,
  placeholder,
}: ProfileInputFieldProps) {
  return (
    <div className="flex items-center">
      <h3 className="text-lg w-[130px]">{title}</h3>
      <input
        type="text"
        placeholder={placeholder}
        className="w-[620px] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
      />
    </div>
  )
}
