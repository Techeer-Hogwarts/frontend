'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TabItem {
  label: string
  value: string
}

interface TabLayoutProps {
  tabs: TabItem[]
  children: React.ReactNode
  selectedTab: string
  onSelect: (tab: string) => void
  iconSrc: string
  iconWidth: number
  iconHeight: number
}

export default function TabLayout({
  tabs,
  children,
  selectedTab,
  onSelect,
  iconSrc,
  iconWidth,
  iconHeight,
}: TabLayoutProps) {
  return (
    <div className="w-full">
      <div className="flex space-x-6 mb-4 pb-2">
        <Image
          src={iconSrc}
          alt="tab icon"
          width={iconWidth}
          height={iconHeight}
          style={{ width: iconWidth, height: iconHeight }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`text-xl ${
              selectedTab === tab.value
                ? 'text-primary border-b-2 border-primary'
                : 'text-black'
            }`}
            onClick={() => onSelect(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}
