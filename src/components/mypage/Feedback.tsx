'use client'

import React from 'react'
import FeedbackMentor from './feedback/FeedbackMentor'
import FeedbackUser from './feedback/FeedbackUser'
import { useAuthStore } from '@/store/authStore'
import TapBar from '../common/TapBar'
import { useTapBarStore } from '@/store/tapBarStore'

const Feedback = () => {
  const { user } = useAuthStore()
  const { activeOption } = useTapBarStore()

  const isMentor = user?.roleId === 2
  const TABS = ['나의 피드백 요청', '받은 피드백 요청']

  return (
    <div className="w-[890px] rounded-xl p-5 relatvie">
      {isMentor ? (
        <>
          <div className="mb-4 absolute">
            <TapBar options={TABS} />
            <div className="flex w-full h-[1px] my-5 bg-gray"></div>
          </div>

          {activeOption === TABS[0] && <FeedbackUser />}
          {activeOption === TABS[1] && <FeedbackMentor />}
        </>
      ) : (
        <FeedbackUser />
      )}
    </div>
  )
}

export default Feedback
