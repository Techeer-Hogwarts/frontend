'use client'

interface MypageTap {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

export default function MypageTap({ activeTab, setActiveTab }: MypageTap) {
  const handleKeyDown = (event, tab) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tab)
    }
  }

  return (
    <div className="flex flex-col w-[14.5rem] h-72 text-[1.1rem] gap-2">
      {/* 홈 탭 */}
      <div
        onClick={() => setActiveTab('home')}
        onKeyDown={(event) => handleKeyDown(event, 'home')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'home'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        홈
      </div>
      {/* 나의 정보 탭 */}
      <div
        onClick={() => setActiveTab('profile')}
        onKeyDown={(event) => handleKeyDown(event, 'profile')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'profile'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        나의 정보
      </div>
      {/* 이력서 탭 */}
      <div
        onClick={() => setActiveTab('resume')}
        onKeyDown={(event) => handleKeyDown(event, 'resume')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'resume'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        이력서
      </div>
      {/* 북마크 탭 */}
      <div
        onClick={() => setActiveTab('bookmark')}
        onKeyDown={(event) => handleKeyDown(event, 'bookmark')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'bookmark'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        북마크
      </div>
      {/* 좋아요 탭 */}
      <div
        onClick={() => setActiveTab('likes')}
        onKeyDown={(event) => handleKeyDown(event, 'likes')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'likes'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        좋아요
      </div>
      {/* 설정 탭 */}
      <div
        onClick={() => setActiveTab('settings')}
        onKeyDown={(event) => handleKeyDown(event, 'settings')}
        tabIndex={0}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer ${
          activeTab === 'settings'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        설정
      </div>
    </div>
  )
}
