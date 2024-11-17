'use client'

export interface MypageTapProps {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

interface TabItemProps {
  label: string
  tabKey: string
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

function TabItem({ label, tabKey, activeTab, setActiveTab }: TabItemProps) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tabKey)
    }
  }

  return (
    <div
      onClick={() => setActiveTab(tabKey)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
        activeTab === tabKey
          ? 'bg-lightprimary text-primary font-extrabold'
          : 'bg-transparent text-black font-medium'
      }`}
    >
      {label}
    </div>
  )
}

export default function MypageTap({ activeTab, setActiveTab }: MypageTapProps) {
  return (
    <div className="flex flex-col w-[14.5rem] h-72 text-[1.1rem] gap-2">
      <TabItem
        label="홈"
        tabKey="home"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabItem
        label="나의 정보"
        tabKey="profile"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabItem
        label="이력서"
        tabKey="resume"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabItem
        label="북마크"
        tabKey="bookmark"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabItem
        label="좋아요"
        tabKey="likes"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabItem
        label="설정"
        tabKey="settings"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  )
}
