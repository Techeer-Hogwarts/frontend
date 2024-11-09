'use client'

export default function MypageTap({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col w-[14.5rem] h-72 text-[1.1rem] gap-2">
      {/* 홈 탭 */}
      <div
        onClick={() => setActiveTab('home')}
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
