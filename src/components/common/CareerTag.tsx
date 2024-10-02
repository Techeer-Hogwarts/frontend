interface Career {
  career: string
}

const CareerTag = ({ career }: Career) => {
  return (
    <div className="flex justify-center w-[3rem] h-[1.4rem] bg-lightgray rounded-md">
      <span className="text-gray-700">{career}</span>
    </div>
    // <div className="flex justify-center w-[3rem] h-[1.4rem] bg-gray-200 rounded-md">
    //     <span className="text-gray-700">경력</span>
    // </div>
  )
}
export default CareerTag
