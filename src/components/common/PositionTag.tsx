interface Position {
  position: string
}

const PositionTag = ({ position }: Position) => {
  return (
    <div className="flex justify-center w-[5.5rem] h-[1.4rem] bg-blue-200 rounded-md">
      <span className="text-blue-900">{position}</span>
    </div>
    // <div className="flex justify-center w-[5rem] h-[1.4rem] bg-green-200 rounded-md">
    //   <span className="text-green-900">Backend</span>
    // </div>
    // <div className="flex justify-center w-[6.8rem] h-[1.4rem] bg-purple-200 rounded-md">
    //   <span className="text-purple-900">DataEngineer</span>
    // </div>
  )
}
export default PositionTag
