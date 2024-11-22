'use client'

import React, { useState } from 'react'

export default function AddGoal() {
  const [goal, setGoal] = useState('')
  const [description, setDescription] = useState('')

  const handleInputChange = (event: any) => {
    setGoal(event.target.value)
  }

  return (
    <div>
      <div className=" flex items-center mb-3 text-left font-medium text-gray">
        스터디를 진행하는 목표에 대해서 작성해주세요
        <span className="text-primary">*</span>
      </div>
      <textarea
        placeholder={`스터디를 만들게된 계기 혹은 해당 스터디를 통해서 무엇을 얻어갈 수 있는 지에 대해 작성해주세요.
(예시)
- 모던 자바스크립트 책을 통해 프론트엔드에 대한 이해도를 높일 수 있습니다.
- 스터디를 통해서 다함께 지식을 공유하고 좀 더 심화적인 학습이 이뤄지도록 할 예정입니다.
- 모던자바스크립트 책을 전부 정독하는 것이 해당 스터디의 목적입니다.`}
        onChange={(e) => setGoal(e.target.value)}
        value={goal}
        maxLength={1000}
        className="w-[52.5rem] h-[11.375rem] p-[1.25rem] whitespace-pre-line rounded-xl border border-gray"
      />
      <p className="text-right text-xs mt-1 text-gray">{goal.length}/1000</p>
    </div>
  )
}
