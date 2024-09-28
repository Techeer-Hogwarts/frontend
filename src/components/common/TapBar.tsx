import TapBtn from './TapBtn'
import SearchBar from './SearchBar'

interface TapBarProps {
  options: string[]
  placeholder: string
}

export default function TapBar({ options, placeholder }: TapBarProps) {
  return (
    <div>
      <div className="flex items-center">
        {options.map((option, index) => (
          <div key={options.length} className="flex items-center">
            <TapBtn>{option}</TapBtn>
            {index !== options.length - 1 && (
              <div className="h-4 w-[1px] bg-gray" />
            )}
          </div>
        ))}
        <div className="ml-auto">
          <SearchBar placeholder={placeholder} />
        </div>
      </div>

      <div className="w-[1200px] h-[1px] mt-5 bg-gray" />
    </div>
  )
}
