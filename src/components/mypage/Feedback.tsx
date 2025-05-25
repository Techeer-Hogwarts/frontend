import React from 'react'
import FeedbackUser from './Feedback/FeedbackUser'
import FeedbackMentor from './Feedback/FeedbackMentor'

const Feedback = () => {
  return (
    <div className="w-[890px] rounded-xl p-5">
      {/* <FeedbackUser /> */}
      <FeedbackMentor />
    </div>
  )
}

export default Feedback
