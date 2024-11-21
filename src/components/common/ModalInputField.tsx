interface ModalInputFieldProps {
  title: string
  placeholder: string
}

export default function ModalInputField({
  title,
  placeholder,
}: ModalInputFieldProps) {
  return (
    <div>
      <p>
        {title} <span className="text-primary">*</span>
      </p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-[420px] pl-2 text-sm mt-1 mb-3 outline-none h-[34px] border border-lightgray"
      />
    </div>
  )
}
