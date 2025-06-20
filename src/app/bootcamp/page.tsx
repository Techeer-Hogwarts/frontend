import React from 'react'
import TapBar from '@/components/common/TapBar'
import Image from 'next/image'
import BootcampModal from '@/components/bootcamp/BootcampModal'

const BootcampPage = () => {
  const options = [
    '전체보기',
    '역대 수상작',
    '10기',
    '9기',
    '8기',
    '7기',
    '6기',
    '5기',
    '4기',
    '3기',
    '2기',
    '1기',
  ]

  const data = [
    {
      id: 1,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 1,
    },
    {
      id: 2,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 2,
    },
    {
      id: 3,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 3,
    },
    {
      id: 4,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 3,
    },
    {
      id: 5,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 6,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 7,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 8,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 9,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 10,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 11,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
    {
      id: 12,
      year: 10,
      image_url: '/images/bootcamp/bootcampImage.svg',
      rank: 0,
    },
  ]

  return (
    <div className="flex justify-center">
      <BootcampModal />
      <div className="flex flex-col w-[1200px]">
        <div className="flex justify-between mt-14 mb-[2.84rem] w-[100%]">
          <div className="text-left">
            <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
            <p className="text-[1.25rem]">
              부트캠프 참여자들의 프로젝트를 확인해보세요.
            </p>
          </div>
          <button className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom">
            <span>부트캠프 등록하기</span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        </div>
        <TapBar options={options} />
        <div className="border-t my-5" />
        <div className="grid grid-cols-4 gap-6">
          {data.map((bootcamp) => (
            <div key={bootcamp.id} className="relative">
              <button>
                <Image
                  src={bootcamp.image_url}
                  alt="bootcamp project Image"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-xl"
                />

                {bootcamp.rank === 1 && (
                  <Image
                    src="/images/bootcamp/1st-place-medal.svg"
                    alt="Gold Medal"
                    width={60}
                    height={60}
                    className="absolute top-0 right-2 z-10"
                  />
                )}

                {bootcamp.rank === 2 && (
                  <Image
                    src="/images/bootcamp/2nd-place-medal.svg"
                    alt="Gold Medal"
                    width={60}
                    height={60}
                    className="absolute top-0 right-2 z-10"
                  />
                )}

                {bootcamp.rank === 3 && (
                  <Image
                    src="/images/bootcamp/3rd-place-medal.svg"
                    alt="Gold Medal"
                    width={60}
                    height={60}
                    className="absolute top-0 right-2 z-10"
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BootcampPage
