import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Second() {
  // 이미지 슬라이드
  const images = [
    { id: 'img1', src: '/sample1.png' },
    { id: 'img2', src: '/sample2.png' },
    { id: 'img3', src: '/sample3.png' },
  ]
  const images2 = [
    { id: 'img4', src: '/sample4.png' },
    { id: 'img5', src: '/sample5.png' },
    { id: 'img6', src: '/sample6.png' },
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000) // 3초마다 슬라이드 변경
    return () => clearInterval(interval) // 컴포넌트 언마운트 시 정리
  }, [])
  return (
    <div className="flex justify-between h-[540px] p-10 bg-lightgray">
      {/* 왼쪽 슬라이더 */}
      <div className="flex">
        <div className="relative w-52 h-45 overflow-hidden">
          <div
            className="flex flex-col transition-transform duration-500"
            // style={{ transform: `translateY(-${currentIndex * 140}px)` }}
          >
            {images.map((image) => (
              <span key={image.id} className="flex-shrink-0">
                <Image
                  width={200}
                  height={140}
                  src={image.src}
                  alt={`sample ${image.id}`}
                />
              </span>
            ))}
            <span className="flex-shrink-0">
              <Image
                width={200}
                height={140}
                src={images[0].src}
                alt="sample 1"
              />
              {/* 첫 번째 이미지를 마지막에 추가 */}
            </span>
          </div>
        </div>
        {/* 오른쪽 슬라이더 */}
        <div className="relative w-52 h-45 overflow-hidden">
          <div
            className="flex flex-col transition-transform duration-500"
            // style={{ transform: `translateY(${currentIndex * 140}px)` }}
          >
            {images2.map((image) => (
              <span key={image.id} className="flex-shrink-0">
                <Image
                  width={200}
                  height={140}
                  src={image.src}
                  alt={`sample ${image.id}`}
                />
              </span>
            ))}
            <span className="flex-shrink-0">
              <Image
                width={200}
                height={140}
                src={images2[0].src}
                alt="sample 4"
              />
            </span>
          </div>
        </div>
      </div>
      {/* 문구 */}
      <div className="flex flex-col">
        <span className="text-primary font-extrabold text-[35px] text-end">
          이력서
        </span>
        <span className="font-bold text-[60px]">모든 이력서를 한 곳에</span>
        <span className="text-[20px] text-end">
          좋은 이력서는 무엇인지 항상 고민되지 않나요? <br />
          <span className="">
            나의 이력서도 공유하며 좋은 이력서가 무엇일지 찾아나가 봐요.
          </span>
        </span>
      </div>
    </div>
  )
}
