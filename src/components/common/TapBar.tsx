import TapBtn from './TapBtn'
import SearchBar from './SearchBar'

interface TapBarProps {
  readonly options: string[]
  readonly placeholder: string
}

export default function TapBar({ options, placeholder }: TapBarProps) {
  return (
    <div>
      <div className="flex items-center">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <TapBtn>{option}</TapBtn>
            {option !== options[options.length - 1] && (
              <div className="h-4 w-[1px] bg-gray" />
            )}
          </div>
        ))}

        <div className="ml-auto">
          <SearchBar placeholder={placeholder} />
        </div>
      </div>

      <div className="w-auto h-[1px] mt-5 bg-gray" />
    </div>
  )
}
