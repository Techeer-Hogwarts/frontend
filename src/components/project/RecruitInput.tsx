interface RecruitInputProps {
  role: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RecruitInput({
  role,
  placeholder,
  value,
  onChange,
}: RecruitInputProps) {
  return (
    <div className="flex mb-[0.69rem]">
      <div className="flex justify-center w-[5.7188rem] h-[1.4955rem] text-[0.9375rem] font-medium text-blue rounded-l-[0.3125rem] bg-lightblue">
        {role}
      </div>
      <input
        type="text"
        className="text-right pt-1 pr-2 w-[2.6875rem] h-[1.4955rem] rounded-r-[0.3125rem] border border-lightblue"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
