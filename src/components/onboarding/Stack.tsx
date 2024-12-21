export default function Stack() {
  const Front = [
    { id: '1', name: 'Frontend' },
    { id: '2', name: 'Javascript' },
    { id: '3', name: 'React' },
    { id: '4', name: 'Typescript' },
    { id: '5', name: 'Next' },
    { id: '6', name: 'Techeer' },
    { id: '7', name: '/* */' },
  ]

  const Back = [
    { id: '1', name: 'Backend' },
    { id: '2', name: 'DataEngineer' },
    { id: '3', name: 'Java' },
    { id: '4', name: 'Python' },
    { id: '5', name: 'Developer' },
    { id: '6', name: 'SQL' },
    { id: '7', name: 'DB' },
    { id: '8', name: '</>' },
  ]
  return (
    <>
      <div className="flex flex-col">
        {Front.map((front) => (
          <div
            key={front.id}
            className="w-[230px] h-[55px] bg-primary text-white text-[30px] font-extrabold rounded-3xl mb-2 flex items-center justify-center"
          >
            {front.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Back.map((back) => (
          <div
            key={back.id}
            className="w-[230px] h-[55px] bg-black text-white text-[30px] font-extrabold rounded-3xl mb-2 flex items-center justify-center"
          >
            {back.name}
          </div>
        ))}
      </div>
    </>
  )
}
