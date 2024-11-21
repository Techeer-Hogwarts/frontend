'use client'

interface MypageTap {
  readonly activeTab: string
  readonly setActiveTab: (activeTab: string) => void
}

export default function MypageTap({ activeTab, setActiveTab }: MypageTap) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
    tab: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tab)
    }
  }

  return (
    <div className="flex flex-col w-[14.5rem] h-72 text-[1.1rem] gap-2">
      {/* 홈 탭 */}
      <button
        onClick={() => setActiveTab('home')}
        onKeyDown={(event) => handleKeyDown(event, 'home')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'home'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        홈
      </button>
      {/* 나의 정보 탭 */}
      <button
        onClick={() => setActiveTab('profile')}
        onKeyDown={(event) => handleKeyDown(event, 'profile')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'profile'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        나의 정보
      </button>
      {/* 이력서 탭 */}
      <button
        onClick={() => setActiveTab('resume')}
        onKeyDown={(event) => handleKeyDown(event, 'resume')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'resume'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        이력서
      </button>
      {/* 북마크 탭 */}
      <button
        onClick={() => setActiveTab('bookmark')}
        onKeyDown={(event) => handleKeyDown(event, 'bookmark')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'bookmark'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        북마크
      </button>
      {/* 좋아요 탭 */}
      <button
        onClick={() => setActiveTab('likes')}
        onKeyDown={(event) => handleKeyDown(event, 'likes')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'likes'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        좋아요
      </button>
      {/* 설정 탭 */}
      <button
        onClick={() => setActiveTab('settings')}
        onKeyDown={(event) => handleKeyDown(event, 'settings')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'settings'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        설정
      </button>
    </div>
  )
}
