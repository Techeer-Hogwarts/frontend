export default function Page() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg p-4 relative w-1/2">
        <button className="absolute top-6 right-6 z-40 text-gray-500 w-7 h-7 flex justify-center items-center text-white rounded-full bg-black/60 hover:text-white/70">
          ✕
        </button>
      </div>
    </div>
  )
}
