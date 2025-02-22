import Lottie from 'react-lottie-player'
import loading from '../../../public/loading.json'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[800px]">
      <Lottie
        animationData={loading}
        loop={true}
        play
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}
