interface BootcampCardProps {
  week: string
  title1: string
  items1: string[]
  title2?: string
  items2?: string[]
}

export default function BootcampCard({
  week,
  title1,
  title2,
  items1,
  items2,
}: BootcampCardProps) {
  return (
    <div className="w-80 h-[450px] rounded-lg">
      <div className="h-16 bg-[#F57601] flex items-center justify-center rounded-t-xl text-white font-semibold text-xl">
        <p>{week}</p>
      </div>
      <div className="rounded-b-xl text-base pt-5 flex flex-col gap-2 justify-start p-10 bg-white h-[360px]">
        <p className="text-xl font-semibold mb-1">{title1}</p>
        {items1.map((item, index) => (
          <div key={index} className="flex relative">
            <span className="absolute top-[10px] left-2 bg-black rounded-full w-1 h-1 mr-3" />
            <p className="ml-5">{item}</p>
          </div>
        ))}
        {title2 && (
          <div>
            <div className="text-base flex flex-col gap-2 justify-start mt-3">
              <p className="text-xl font-semibold mb-1">{title2}</p>
              {items2.map((item, index) => (
                <div key={index} className="flex relative">
                  <span className="absolute top-[10px] left-2 bg-black rounded-full w-1 h-1 mr-3" />
                  <p className="ml-5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
