interface Career {
  career: string
}

const CareerTag = ({ career }: Career) => {
  return (
    <div className="flex justify-center px-1 h-[1.4rem] bg-lightgray rounded-md text-sm items-center">
      <span className="text-darkgray">{career}</span>
    </div>
  )
}
export default CareerTag
