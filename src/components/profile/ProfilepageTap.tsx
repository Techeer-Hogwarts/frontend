import { Dispatch, SetStateAction } from 'react'

type TabType = 'home' | 'profile' | 'resume'

interface MypageTapProps {
  readonly activeTab: TabType
  readonly setActiveTab: Dispatch<SetStateAction<TabType>>
}

export default function MypageTap({ activeTab, setActiveTab }: MypageTapProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
    tab: TabType,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tab)
    }
  }

  const tabs: TabType[] = ['home', 'profile', 'resume']

  return (
    <div className="flex flex-col w-[14.5rem] h-72 text-[1.1rem] gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          onKeyDown={(event) => handleKeyDown(event, tab)}
          className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
            activeTab === tab
              ? 'bg-lightprimary text-primary font-extrabold'
              : 'bg-transparent text-black font-medium'
          }`}
        >
          {tab === 'home' && '홈'}
          {tab === 'profile' && '나의 정보'}
          {tab === 'resume' && '이력서'}
        </button>
      ))}
    </div>
  )
}
