interface ModalInputFieldProps {
  readonly title: string
  readonly placeholder: string
  readonly name: string
  readonly value: string
  essential: string
  readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ModalInputField({
  title,
  placeholder,
  name,
  value,
  handleInputChange,
  essential,
}: ModalInputFieldProps) {
  return (
    <div>
      <p>
        {title}
        <span className="text-primary">{essential}</span>
      </p>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-[420px] pl-2 text-sm mt-1 mb-2 outline-none h-[34px] border border-lightgray"
      />
    </div>
  )
}
