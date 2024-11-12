export default function Stack() {
  const Front = [
    'Frontend',
    'Javascript',
    'React',
    'Typescript',
    'Next',
    'Techeer',
    '/* */',
  ]

  const Back = [
    'Backend',
    'DataEngineer',
    'Java',
    'Python',
    'Developer',
    'SQL',
    'DB',
    '</>',
  ]
  return (
    <>
      <div className="flex flex-col">
        {Front.map((front, index) => (
          <div
            key={index}
            className="w-[230px] h-[55px] bg-primary text-white text-[30px] font-extrabold rounded-3xl mb-2 flex items-center justify-center"
          >
            {front}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Back.map((back, index) => (
          <div
            key={index}
            className="w-[230px] h-[55px] bg-black text-white text-[30px] font-extrabold rounded-3xl mb-2 flex items-center justify-center"
          >
            {back}
          </div>
        ))}
      </div>
    </>
  )
}
