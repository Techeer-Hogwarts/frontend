import { useState } from 'react'

export default function Tap() {
  const [activeTab, setActiveTab] = useState<'resume' | 'portfolio'>('resume')
  return (
    <div className="flex flex-col w-[14.5rem] h-[6.25rem] text-[1.1rem] gap-2">
      {/* 이력서 탭 */}
      <div
        onClick={() => setActiveTab('resume')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer font-extrabold ${
          activeTab === 'resume'
            ? 'bg-lightprimary text-primary font-extrabold'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        이력서
      </div>
      {/* 포트폴리오 탭 */}
      <div
        onClick={() => setActiveTab('portfolio')}
        className={`flex items-center h-[2.813rem] px-3 rounded-xl cursor-pointer font-extrabold ${
          activeTab === 'portfolio'
            ? 'bg-lightprimary text-primary'
            : 'bg-transparent text-black font-medium'
        }`}
      >
        포트폴리오
      </div>
    </div>
  )
}
