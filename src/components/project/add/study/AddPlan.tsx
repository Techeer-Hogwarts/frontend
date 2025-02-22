'use client'

import React, { useState } from 'react'

export default function AddPlan({ rule, onUpdate }) {
  const handleInputChange = (e) => {
    onUpdate('rule', e.target.value)
  }

  return (
    <div>
      <div className=" flex items-center mb-3 text-left font-medium text-gray">
        스터디를 진행 방식에 대해서 작성해주세요
        <span className="text-primary">*</span>
      </div>
      <textarea
        placeholder={`스터디에서 구체적으로 어떤 활동을 어떤 주기로 하는지 작성해주세요. 

(예시)
- 주에 한번씩 만나서 정해진 분량의 책을 읽고 정리해옵니다.
- 정리해온 내용을 한 명이 발표하고 이후 해당 주제에 대한 토론을 진행합니다.`}
        onChange={handleInputChange}
        value={rule}
        maxLength={1000}
        className="w-[52.5rem] h-[11.375rem] p-[1.25rem] whitespace-pre-line rounded-xl border border-gray"
      />
      <p className="text-right text-xs mt-1 text-gray">{rule.length}/1000</p>
    </div>
  )
}
