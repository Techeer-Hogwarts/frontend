import Image from 'next/image'
import clsx from 'clsx'

interface AutoSliderProps {
  logos: string[]
  direction?: 'left' | 'right'
}

export default function AutoSlider({
  logos,
  direction = 'left',
}: AutoSliderProps) {
  const isReverse = direction === 'right'

  return (
    <div className="w-screen min-w-[1200px] overflow-hidden bg-gray-100 h-[120px]">
      <div
        className={clsx(
          'flex w-[200%] animate-slider',
          isReverse ? 'animate-slider-reverse' : 'animate-slider',
        )}
      >
        {[...Array(2)].map((_, i) => (
          <div className="flex" key={i}>
            {logos.map((logo, index) => (
              <Image
                key={`${i}-${index}`}
                className="object-contain shrink-0 pr-10"
                src={`/images/onboarding/${logo}.png`}
                alt={logo}
                width={173}
                height={94}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
