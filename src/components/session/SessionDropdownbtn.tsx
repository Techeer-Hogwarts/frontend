export interface SessionDropdownbtnProps {
  title: string
}

export default function SessionDropdownbtn({ title }: SessionDropdownbtnProps) {
  return (
    <button type="button" className="flex ml-5 text-sm items-center h-6">
      {title}
    </button>
  )
}
