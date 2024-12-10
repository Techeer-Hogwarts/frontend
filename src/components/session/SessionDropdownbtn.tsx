export interface SessionDropdownbtnProps {
  children: string
}

export default function SessionDropdownbtn({
  children,
}: SessionDropdownbtnProps) {
  return (
    <button type="button" className="flex ml-5 items-center h-[34px]">
      {children}
    </button>
  )
}
