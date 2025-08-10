interface FilterProps {
  solvedFilter: 'solved' | 'unsolved' | null
  setSolvedFilter: (filter: 'solved' | 'unsolved' | null) => void
}

export default function Filter({ solvedFilter, setSolvedFilter }: FilterProps) {
  const toggleFilter = (filter: 'solved' | 'unsolved') => {
    if (solvedFilter === filter) {
      setSolvedFilter(null)
    } else {
      setSolvedFilter(filter)
    }
  }

  return (
    <div className="flex gap-2 mb-10">
      <button
        className={`px-3 py-1 rounded-full text-darkgray border ${solvedFilter === 'solved' ? 'bg-lightgray border-lightgray' : 'bg-white border-gray'}`}
        onClick={() => toggleFilter('solved')}
      >
        푼 문제 21
      </button>
      <button
        className={`px-3 py-1 rounded-full text-darkgray border ${solvedFilter === 'unsolved' ? 'bg-lightgray border-lightgray' : 'bg-white border-gray'}`}
        onClick={() => toggleFilter('unsolved')}
      >
        안 푼 문제 36
      </button>
    </div>
  )
}
