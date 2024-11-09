interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <div id={id} className="mt-10">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      {children}
      <div className="flex flex-col items-center mt-10">
        <button className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors">
          더보기 +
        </button>
        <div className="w-[62.5rem] h-[1px] mt-6 bg-lightgray"></div>
      </div>
    </div>
  )
}

export default Section
